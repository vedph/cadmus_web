import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TextLayerService, TokenLocation } from '@cadmus/core';

@Component({
  selector: 'cadmus-layer-demo',
  templateUrl: './layer-demo.component.html',
  styleUrls: ['./layer-demo.component.css']
})
export class LayerDemoComponent implements OnInit {
  @ViewChild('resultElem') _resultElement: ElementRef;

  public locations: TokenLocation[];
  public result: string;
  public userLocation: TokenLocation;
  // form
  public rendition: FormGroup;
  public text: FormControl;
  public location: FormControl;

  constructor(formBuilder: FormBuilder,
    private _textLayerService: TextLayerService) {
    this.locations = [];
    this.text = formBuilder.control('alpha beta\ngamma\ndelta epsilon waw\nzeta');
    this.location = formBuilder.control('1.2@2x2');
    this.rendition = formBuilder.group({
      'text': this.text,
      'location': this.location
    });
    this.result = '';
  }

  ngOnInit() {
  }

  private removeOverlaps(loc: TokenLocation) {
    for (let i = this.locations.length - 1; i > -1; i--) {
      if (loc === this.locations[i]) {
        continue;
      }
      if (loc.overlaps(this.locations[i])) {
        this.locations.splice(i, 1);
      }
    }
  }

  public addLocation() {
    if (!this.location.value) {
      return;
    }
    const loc = TokenLocation.parse(this.location.value);
    if (!loc) {
      return;
    }

    let done = false;
    for (let i = 0; i < this.locations.length && !done; i++) {
      const n = loc.compareTo(this.locations[i]);
      // nothing to do if equal
      if (n === 0) {
        return;
      }
      // insert before nearest bigger sort value
      if (n < 0) {
        this.locations.splice(i, 0, loc);
        done = true;
      }
    }
    // append if not yet inserted
    if (!done) {
      this.locations.push(loc);
    }

    // remove all the overlapping locations
    this.removeOverlaps(loc);
  }

  public removeLocation(loc: TokenLocation) {
    const i = this.locations.indexOf(loc);
    if (i > -1) {
      this.locations.splice(i, 1);
    }
  }

  public clearLocations() {
    this.locations.length = 0;
  }

  public render() {
    this.result = this._textLayerService.render(this.text.value, this.locations);
  }

  public getLocationForNew() {
    this.userLocation = this._textLayerService.getSelectedLocationForNew(
      this._textLayerService.getSelectedRange(), this.text.value);
  }

  public getLocationForEdit() {
    this.userLocation = this._textLayerService.getSelectedLocationForEdit(
      this._textLayerService.getSelectedRange());
  }
}
