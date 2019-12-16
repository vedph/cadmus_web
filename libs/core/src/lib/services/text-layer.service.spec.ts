import { TestBed, inject } from '@angular/core/testing';

import { TokenLocation } from '../token-location';
import { TextLayerService, SelectedRange } from './text-layer.service';

xdescribe('TextLayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextLayerService]
    });
  });

  it('should be created', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      expect(service).toBeTruthy();
    }
  ));

  /*
   * getLines method
   */
  it('getLines with empty string should return empty array', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      expect(service.getLines('').length).toEqual(0);
    }
  ));

  it('getLines with ws string should return empty line', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const lines = service.getLines('  ');
      expect(lines.length).toEqual(1);
      expect(lines[0].tokens.length).toEqual(0);
    }
  ));

  it('getLines with single line string should return 1 line', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const lines = service.getLines('alpha');
      expect(lines.length).toEqual(1);
      const line = lines[0];
      expect(line.y).toEqual(1);
      expect(line.tokens.length).toEqual(1);
    }
  ));

  it('getLines with multiple line string should return N lines', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const lines = service.getLines('alpha\nbeta gamma');
      expect(lines.length).toEqual(2);

      let line = lines[0];
      expect(line.y).toEqual(1);
      expect(line.tokens.length).toEqual(1);
      expect(line.tokens[0]).toEqual('alpha');

      line = lines[1];
      expect(line.y).toEqual(2);
      expect(line.tokens.length).toEqual(2);
      expect(line.tokens[0]).toEqual('beta');
      expect(line.tokens[1]).toEqual('gamma');
    }
  ));

  /*
   * render method
   */
  it('render with empty text should return empty div', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('', null);
      expect(html).toEqual('<div></div>');
    }
  ));

  it('render with 1 line "[alpha]" should return div/p', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('alpha', null);
      expect(html).toEqual('<div><p id="y1">alpha</p></div>');
    }
  ));

  it('render with 1 line "[alpha beta]" should return div/p', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('alpha beta', null);
      expect(html).toEqual('<div><p id="y1">alpha beta</p></div>');
    }
  ));

  it('render with 2 lines should return div/p*2', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('alpha\nbeta', null);
      expect(html).toEqual(
        '<div><p id="y1">alpha</p>' + '<p id="y2">beta</p></div>'
      );
    }
  ));

  it('render with empty text should return empty div', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('', null);
      expect(html).toEqual('<div></div>');
    }
  ));

  // single token
  it('render 1 line "[alpha]" should return div/p/span', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('alpha', [TokenLocation.parse('1.1')]);
      expect(html).toEqual(
        '<div><p id="y1">' +
          '<span id="f1.1_0" class="fr">alpha</span>' +
          '</p></div>'
      );
    }
  ));

  it('render 1 line "al[pha]" should return div/p/span', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('alpha', [TokenLocation.parse('1.1@3x3')]);
      expect(html).toEqual(
        '<div><p id="y1">' +
          'al<span id="f1.1@3x3_0" class="fr">pha</span>' +
          '</p></div>'
      );
    }
  ));

  it('render 1 line "[al]pha" should return div/p/span', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('alpha', [TokenLocation.parse('1.1@1x2')]);
      expect(html).toEqual(
        '<div><p id="y1">' +
          '<span id="f1.1@1x2_0" class="fr">al</span>pha' +
          '</p></div>'
      );
    }
  ));

  it('render 1 line "al[p]ha" should return div/p/span', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('alpha', [TokenLocation.parse('1.1@3x1')]);
      expect(html).toEqual(
        '<div><p id="y1">' +
          'al<span id="f1.1@3_0" class="fr">p</span>ha' +
          '</p></div>'
      );
    }
  ));

  // multiple tokens in single line
  it('render 1 line "[alpha beta] gamma" should return div/p/span', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('alpha beta gamma', [
        TokenLocation.parse('1.1-1.2')
      ]);
      expect(html).toEqual(
        '<div><p id="y1">' +
          '<span id="f1.1-1.2_0" class="fr">alpha beta</span>' +
          ' gamma</p></div>'
      );
    }
  ));

  it('render 1 line "[alpha beta gamma]" should return div/p/span', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('alpha beta gamma', [
        TokenLocation.parse('1.1-1.3')
      ]);
      expect(html).toEqual(
        '<div><p id="y1">' +
          '<span id="f1.1-1.3_0" class="fr">alpha beta gamma</span>' +
          '</p></div>'
      );
    }
  ));

  it('render 1 line "al[pha beta]" should return div/p/span', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('alpha beta gamma', [
        TokenLocation.parse('1.1@3x3-1.2')
      ]);
      expect(html).toEqual(
        '<div><p id="y1">' +
          'al<span id="f1.1@3x3-1.2_0" class="fr">pha beta</span>' +
          ' gamma</p></div>'
      );
    }
  ));

  it('render 1 line "[alpha be]ta gamma" should return div/p/span', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('alpha beta gamma', [
        TokenLocation.parse('1.1-1.2@1x2')
      ]);
      expect(html).toEqual(
        '<div><p id="y1">' +
          '<span id="f1.1-1.2@1x2_0" class="fr">alpha be</span>ta' +
          ' gamma</p></div>'
      );
    }
  ));

  it('render 1 line "al[pha be]ta gamma" should return div/p/span', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('alpha beta gamma', [
        TokenLocation.parse('1.1@3x3-1.2@1x2')
      ]);
      expect(html).toEqual(
        '<div><p id="y1">' +
          'al<span id="f1.1@3x3-1.2@1x2_0" class="fr">pha be</span>ta' +
          ' gamma</p></div>'
      );
    }
  ));

  /*
   * getSelectedLocationForEdit method
   * (see https://davidwalsh.name/convert-html-stings-dom-nodes)
   */
  it('getSelectedLocationForEdit from "[alpha] beta gamma" selected p should return 1.1', inject(
    [TextLayerService],
    (service: TextLayerService) => {
      const html = service.render('alpha beta gamma', [
        TokenLocation.parse('1.1')
      ]);
      const doc = document.createRange().createContextualFragment(html);

      const p = doc.childNodes.item(0);
      const range: SelectedRange = {
        commonAncestorContainer: p,
        startContainer: p.childNodes.item(0),
        startOffset: 0,
        endContainer: p.childNodes.item(2),
        endOffset: 5
      };

      const loc = service.getSelectedLocationForEdit(range);

      expect(loc.toString()).toEqual('1.1');
    }
  ));

  /*
   * getSelectedLocationForNew method
   */
});
