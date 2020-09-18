# Demo Presets

Here you can find some presets for model and thesauri to be used in the app's demo pages. Just open the corresponding page under the `Demo` menu, and in the JSON code view paste the first JSON document in the _model_, and the second one (if any) in the _thesauri_; then click the `Apply` button. You will be lead to the visual editor, and be able to experiment its functionality.

From the visual view you can then save, and go back to the JSON code view. You can freely go back and forth between these two views, even if only the visual one will appear to the end-user. This is just a demo/test environment, where you can quickly experiment with each part or fragment editor.

## Part/Categories

```json
{
  "itemId": "4a26ad5c-0a82-4a21-b1d7-15cddbb1bfd1",
  "id": "1bf411d8-54ad-4f4c-bde6-2fc78226ebd5",
  "typeId": "it.vedph.note",
  "roleId": "",
  "timeCreated": "2019-11-29T16:48:49.694Z",
  "creatorId": "zeus",
  "timeModified": "2019-11-29T16:48:49.694Z",
  "userId": "zeus",
  "categories": ["green","red"]
}
```

```json
{
  "categories": {
    "id": "categories",
    "language": "ita",
    "entries": [
      { "id": "red", "value": "rosso" },
      { "id": "green", "value": "verde" },
      { "id": "green.lite", "value": "verde chiaro" },
      { "id": "green.dark", "value": "verde scuro" },
      { "id": "blue", "value": "blu" }
    ]
  }
}
```

## Part/Keywords

```json
{
  "itemId": "4a26ad5c-0a82-4a21-b1d7-15cddbb1bfd1",
  "id": "1bf411d8-54ad-4f4c-bde6-2fc78226ebd5",
  "typeId": "it.vedph.keywords",
  "roleId": "",
  "timeCreated": "2019-11-29T16:48:49.694Z",
  "creatorId": "zeus",
  "timeModified": "2019-11-29T16:48:49.694Z",
  "userId": "zeus",
  "keywords": [
    { "language": "eng", "value": "red" },
    { "language": "ita", "value": "rosso" }
  ]
}
```

```json
{
  "languages": {
    "id": "languages@en",
    "entries": [
      {
        "id": "eng",
        "value": "English"
      },
      {
        "id": "fre",
        "value": "French"
      },
      {
        "id": "deu",
        "value": "German"
      },
      {
        "id": "grc",
        "value": "Ancient Greek"
      },
      {
        "id": "gre",
        "value": "Modern Greek"
      },
      {
        "id": "ita",
        "value": "Italian"
      },
      {
        "id": "lat",
        "value": "Latin"
      },
      {
        "id": "spa",
        "value": "Spanish"
      }
    ]
  }
}
```

## Part/Index Keywords

```json
{
  "itemId": "4a26ad5c-0a82-4a21-b1d7-15cddbb1bfd1",
  "id": "1bf411d8-54ad-4f4c-bde6-2fc78226ebd5",
  "typeId": "it.vedph.index-keywords",
  "roleId": "",
  "timeCreated": "2019-11-29T16:48:49.694Z",
  "creatorId": "zeus",
  "timeModified": "2019-11-29T16:48:49.694Z",
  "userId": "zeus",
  "keywords": [
    { "indexId": "colors", "language": "eng", "value": "red" },
    { "indexId": "colors", "language": "ita", "value": "rosso" },
    { "indexId": "shapes", "language": "eng", "value": "circle" },
    { "indexId": "shapes", "language": "eng", "value": "square" },
    { "indexId": "shapes", "language": "eng", "value": "triangle" }
  ]
}
```

```json
{
  "keyword-indexes": {
    "id": "keyword-indexes@en",
    "entries": [
      { "id": "colors", "value": "colors" },
      { "id": "shapes", "value": "shapes" }
    ]
  },
  "languages": {
    "id": "languages@en",
    "entries": [
      {
        "id": "eng",
        "value": "English"
      },
      {
        "id": "fre",
        "value": "French"
      },
      {
        "id": "deu",
        "value": "German"
      },
      {
        "id": "grc",
        "value": "Ancient Greek"
      },
      {
        "id": "gre",
        "value": "Modern Greek"
      },
      {
        "id": "ita",
        "value": "Italian"
      },
      {
        "id": "lat",
        "value": "Latin"
      },
      {
        "id": "spa",
        "value": "Spanish"
      }
    ]
  }
}
```

## Part/Note

```json
{
  "itemId": "4a26ad5c-0a82-4a21-b1d7-15cddbb1bfd1",
  "id": "1bf411d8-54ad-4f4c-bde6-2fc78226ebd5",
  "typeId": "it.vedph.note",
  "roleId": "",
  "timeCreated": "2019-11-29T16:48:49.694Z",
  "creatorId": "zeus",
  "timeModified": "2019-11-29T16:48:49.694Z",
  "userId": "zeus",
  "tag": "green",
  "text": "# Note\nThis is a **sample** text.\n\n## Markdown\nAs you can see, we're *Markdown* enabled."
}
```

The thesaurus is optional. When not set, the editor allows free text for the tag.

```json
{
  "note-tags": {
    "id": "note-tags@it",
    "language": "ita",
    "entries": [
      { "id": "red", "value": "rosso" },
      { "id": "green", "value": "verde" },
      { "id": "blue", "value": "blu" }
    ]
  }
}
```

## Part/Historical Date

```json
{
  "itemId": "4a26ad5c-0a82-4a21-b1d7-15cddbb1bfd1",
  "id": "1bf411d8-54ad-4f4c-bde6-2fc78226ebd5",
  "typeId": "it.vedph.note",
  "roleId": "",
  "timeCreated": "2019-11-29T16:48:49.694Z",
  "creatorId": "zeus",
  "timeModified": "2019-11-29T16:48:49.694Z",
  "userId": "zeus",
  "date": {
    "a": {
      "value": 123,
      "isApproximate": true
    }
  }
}
```

No thesaurus is required for this part.

## Part/Bibliography Part

```json
{
  "itemId": "4a26ad5c-0a82-4a21-b1d7-15cddbb1bfd1",
  "id": "1bf411d8-54ad-4f4c-bde6-2fc78226ebd5",
  "typeId": "it.vedph.note",
  "roleId": "",
  "timeCreated": "2019-11-29T16:48:49.694Z",
  "creatorId": "zeus",
  "timeModified": "2019-11-29T16:48:49.694Z",
  "userId": "zeus",
  "entries": [
    {
      "typeId": "book",
      "authors": [
        {
          "firstName": "Michel",
          "lastName": "Lejeune"
        }
      ],
      "title": "Phonétique historique du mycénien et du grec ancien",
      "language": "fre",
      "edition": 1,
      "publisher": "Klincksieck",
      "yearPub": 1982,
      "placePub": "Paris",
      "firstPage": 1,
      "lastPage": 398,
      "keywords": [
        {
          "language": "eng",
          "value": "Greek language"
        }
      ],
      "note": "This is a wonderful book."
    },
    {
      "typeId": "article-b",
      "authors": [
        {
          "firstName": "Mario",
          "lastName": "Cantilena"
        }
      ],
      "title": "Il ponte di Nicanore",
      "language": "ita",
      "contributors": [
        {
          "firstName": "Roberto",
          "lastName": "Pretagostini",
          "roleId": "ed"
        },
        {
          "firstName": "Marco",
          "lastName": "Fantuzzi",
          "roleId": "ed"
        }
      ],
      "container": "Struttura e storia dell'esametro greco",
      "yearPub": 1995,
      "placePub": "Roma",
      "firstPage": 9,
      "lastPage": 67,
      "keywords": [
        {
          "language": "eng",
          "value": "hexameter"
        }
      ]
    }
  ]
}
```

Thesauri: the language thesaurus is required; other thesauri are optional, but normally present.

```json
{
  "languages": {
    "id": "languages@en",
    "entries": [
      {
        "id": "eng",
        "value": "English"
      },
      {
        "id": "fre",
        "value": "French"
      },
      {
        "id": "deu",
        "value": "German"
      },
      {
        "id": "grc",
        "value": "Ancient Greek"
      },
      {
        "id": "gre",
        "value": "Modern Greek"
      },
      {
        "id": "ita",
        "value": "Italian"
      },
      {
        "id": "lat",
        "value": "Latin"
      },
      {
        "id": "spa",
        "value": "Spanish"
      }
    ]
  },
  "bibliography-types": {
    "id": "bibliography-types@en",
    "entries": [
      {
        "id": "book",
        "value": "book"
      },
      {
        "id": "article-j",
        "value": "journal article"
      },
      {
        "id": "article-b",
        "value": "book article"
      },
      {
        "id": "article-p",
        "value": "proceedings article"
      },
      {
        "id": "review",
        "value": "review"
      },
      {
        "id": "ebook",
        "value": "e-book"
      },
      {
        "id": "site",
        "value": "web site"
      },
      {
        "id": "magazine",
        "value": "magazine"
      },
      {
        "id": "newspaper",
        "value": "newspaper"
      },
      {
        "id": "tweet",
        "value": "tweet"
      }
    ]
  },
  "bibliography-author-roles": {
    "id": "bibliography-author-roles@en",
    "entries": [
      {
        "id": "ed",
        "value": "editor"
      },
      {
        "id": "tr",
        "value": "translator"
      },
      {
        "id": "org",
        "value": "organization"
      }
    ]
  }
}
```

## Part/Token Text Part

```json
{
  "itemId": "4a26ad5c-0a82-4a21-b1d7-15cddbb1bfd1",
  "id": "1bf411d8-54ad-4f4c-bde6-2fc78226ebd5",
  "typeId": "it.vedph.note",
  "roleId": "",
  "timeCreated": "2019-11-29T16:48:49.694Z",
  "creatorId": "zeus",
  "timeModified": "2019-11-29T16:48:49.694Z",
  "userId": "zeus",
  "lines": [
    {
      "y": 1,
      "text": "quos putamus amissos,"
    },
    {
      "y": 2,
      "text": "praemissi sunt."
    }
  ],
  "citation": "Sen. ep. 1,23"
}
```

No thesaurus is required for this part.

## Part/Tiled Text Part

```json
{
  "id": "009dcbd9-b1f1-4dc2-845d-1d9c88c83269",
  "itemId": "2c2eadb7-1972-4415-9a43-b8036b6fa685",
  "typeId": "it.vedph.tiled-text-part",
  "roleId": null,
  "timeCreated": "2019-11-29T16:48:49.694Z",
  "creatorId": "zeus",
  "timeModified": "2019-11-29T16:48:49.694Z",
  "userId": "zeus",
  "citation": "Lucr.2,1-2",
  "rows": [
    {
      "y": 1,
      "tiles": [
        {
          "x": 1,
          "data": {
            "text": "Suaue,",
            "patch": "Suave",
            "id": "d002w1"
          }
        },
        {
          "x": 2,
          "data": {
            "text": "mari",
            "id": "d002w2"
          }
        },
        {
          "x": 3,
          "data": {
            "text": "magno",
            "id": "d002w3"
          }
        },
        {
          "x": 4,
          "data": {
            "text": "turbantibus",
            "id": "d002w4"
          }
        },
        {
          "x": 5,
          "data": {
            "text": "aequora",
            "id": "d002w5"
          }
        },
        {
          "x": 6,
          "data": {
            "text": "uentis",
            "id": "d002w6",
            "patch": "ventis"
          }
        }
      ],
      "data": {
        "id": "d002l1",
        "n": "1"
      }
    },
    {
      "y": 2,
      "tiles": [
        {
          "x": 1,
          "data": {
            "text": "E",
            "id": "d002w7"
          }
        },
        {
          "x": 2,
          "data": {
            "text": "terra",
            "id": "d002w8"
          }
        },
        {
          "x": 3,
          "data": {
            "text": "magnum",
            "id": "d002w9"
          }
        },
        {
          "x": 4,
          "data": {
            "text": "alterius",
            "id": "d002w10"
          }
        },
        {
          "x": 5,
          "data": {
            "text": "spectare",
            "id": "d002w11"
          }
        },
        {
          "x": 6,
          "data": {
            "text": "laborem;",
            "id": "d002w12"
          }
        }
      ],
      "data": {
        "id": "d002l2",
        "n": "2"
      }
    }
  ]
}
```

No thesaurus is required for this part.

## Fragment/Apparatus

```json
{
  "location": "3.1",
  "tag": "d001",
  "entries": [
    {
      "type": 0,
      "value": "siluestrem",
      "normValue": "SILVESTREM",
      "isAccepted": true,
      "witnesses": [{ "value": "lw1-16" }, { "value": "lw1-21" }],
      "authors": []
    },
    {
      "type": 0,
      "value": "agrestem",
      "normValue": "AGRESTEM",
      "isAccepted": false,
      "witnesses": [],
      "authors": [
        { "value": "lb1-50", "note": "9, 4, 85" },
        { "value": "lb1-25", "note": "SI 244" }
      ]
    }
  ]
}
```

```json
{
  "apparatus-tags": {
    "id": "apparatus-tags@en",
    "entries": [
      {
        "id": "margin",
        "value": "margin"
      }
    ]
  },
  "apparatus-witnesses": {
    "id": "apparatus-witnesses.verg-eclo@en",
    "entries": [
      {
        "id": "lw1-1",
        "value": "Bernensis 172 (ecl. 1-Aen. 5)"
      },
      {
        "id": "lw1-2",
        "value": "correctores vel variae lectiones..."
      },
      {
        "id": "lw1-3",
        "value": "Bernensis 165, olim Turonensis [MO B. 10, saec. IX 1/4]"
      },
      {
        "id": "lw1-4",
        "value": "correctores vel variae lectiones..."
      },
      {
        "id": "lw1-5",
        "value": "Bernensis 184  [MO B.13: saec. IX-X]"
      },
      {
        "id": "lw1-6",
        "value": "correctores vel variae lectiones..."
      },
      {
        "id": "lw1-7",
        "value": "Bernensis 255 + 239, in Gallia... [MO B. 14, saec. IX 2/3]"
      },
      {
        "id": "lw1-8",
        "value": "Bernensis 167, origine Autissi... (desunt Aen. 12.452-579;...)"
      },
      {
        "id": "lw1-9",
        "value": "Oxoniensis Bodl. Auct. F. 2... [MO B. 155, saec. IX¹]"
      },
      {
        "id": "lw1-10",
        "value": "Valentianensis 407 (389)"
      },
      {
        "id": "lw1-11",
        "value": "Mediceus Laurentianus Latinus Plut... [CLA III 296]"
      },
      {
        "id": "lw1-12",
        "value": "Turcius Rufius Apronianus Asterius,..."
      },
      {
        "id": "lw1-13",
        "value": "corrector saec. V"
      },
      {
        "id": "lw1-14",
        "value": "Neapolitanus Vind. lat. 6,... [MO B. 151, saec X¹]"
      },
      {
        "id": "lw1-15",
        "value": "Ausonensis, Archivo Capitular Vic... [MO C. 272, saec. XI¹]"
      },
      {
        "id": "lw1-16",
        "value": "Vaticanus Palatinus lat. 1631,... [CLA I 99]"
      },
      {
        "id": "lw1-17",
        "value": "corrector Vaticani Palatini lat... (saec. V-VI)"
      },
      {
        "id": "lw1-18",
        "value": "corrector Vaticani Palatini lat... (saec. V-VI)"
      },
      {
        "id": "lw1-19",
        "value": "Parisinus lat. 7926  [MO B. 171, saec. IX 2/4]"
      },
      {
        "id": "lw1-20",
        "value": "codices quidam recentiores vel..."
      },
      {
        "id": "lw1-21",
        "value": "Vaticanus lat. 3867, dictus... [CLA I 19]"
      },
      {
        "id": "lw1-22",
        "value": "corrector Vaticani Latini 3867"
      },
      {
        "id": "lw1-23",
        "value": "corrector saec. VI ex."
      },
      {
        "id": "lw1-24",
        "value": "Parisinus lat. 13043, olim... [MO B.192: saec. IX 2/3]"
      },
      {
        "id": "lw1-25",
        "value": "Vaticanus lat. 1570, olim... [MO B. 256, saec. IX/X]"
      },
      {
        "id": "lw1-26",
        "value": "Veronensis XL 38, saec. V ex... (Codices Latini Antiquiores, ed. E...)"
      },
      {
        "id": "lw1-27",
        "value": "Guelferbytanus Gudianus lat... [MO B. 281, saec. IX]"
      },
      {
        "id": "lw1-28",
        "value": "Corrector Guelferbytani Gudiani..."
      },
      {
        "id": "lw1-29",
        "value": "Corrector Guelferbytani Gudiani..."
      },
      {
        "id": "lw1-30",
        "value": "Papyrus Strasb. Latinus 2 [Pack³n..."
      },
      {
        "id": "lw1-31",
        "value": "consensus codicum saeculi noni vel..."
      }
    ]
  },
  "apparatus-authors": {
    "id": "apparatus-authors.verg-eclo@en",
    "entries": [
      {
        "id": "lb1-1",
        "value": "Aldhelmus (saec. VII)"
      },
      {
        "id": "lb1-2",
        "value": "Anthologia latina (codex Salmasianus saec. VIII)"
      },
      {
        "id": "lb1-3",
        "value": "Ars anonyma bernensis = GLK... (1870)"
      },
      {
        "id": "lb1-4",
        "value": "Arusianus Messius (saec. IV ex.)"
      },
      {
        "id": "lb1-5",
        "value": "Audax gramm."
      },
      {
        "id": "lb1-6",
        "value": "Beda Presbyterus (VII saec.)"
      },
      {
        "id": "lb1-7",
        "value": "Brevis expositio Vergilii..."
      },
      {
        "id": "lb1-8",
        "value": "Caper gramm., pp. 92-112."
      },
      {
        "id": "lb1-9",
        "value": "Flavius Magnus Aurelius Cassio... (saec. VI)"
      },
      {
        "id": "lb1-10",
        "value": "Flavius Sosipater Charisius (saec. IV ex.)"
      },
      {
        "id": "lb1-11",
        "value": "Ciris"
      },
      {
        "id": "lb1-12",
        "value": "Cledonius (saec. V)"
      },
      {
        "id": "lb1-13",
        "value": "Colum."
      },
      {
        "id": "lb1-14",
        "value": "Commentum einsidlense in Donati... (minorem et maiorem)"
      },
      {
        "id": "lb1-15",
        "value": "Marci Annaei Lucani commenta..."
      },
      {
        "id": "lb1-16",
        "value": "Consentius (saec. V)"
      },
      {
        "id": "lb1-17",
        "value": "Const. or. s.c., pp. 149-192."
      },
      {
        "id": "lb1-18",
        "value": "Diom. gramm., pp. 299-529."
      },
      {
        "id": "lb1-19",
        "value": "Aelius Donatus grammaticus (saec. IV)"
      },
      {
        "id": "lb1-20",
        "value": "Dositheus (post Donatum)"
      },
      {
        "id": "lb1-21",
        "value": "De dubiis nominibus liber (post Isidorum)"
      },
      {
        "id": "lb1-22",
        "value": "Sergii qui feruntur explanationem... (libri II)"
      },
      {
        "id": "lb1-23",
        "value": "Fabius Planciades Fulgentius (saec. V ex. vel VI in.)"
      },
      {
        "id": "lb1-24",
        "value": "Aulus Gellius (saec. II)"
      },
      {
        "id": "lb1-25",
        "value": "Glossarium Ansileubi , saec..."
      },
      {
        "id": "lb1-26",
        "value": "Excerpta ex Grilli commento in... (saec.IV-V)"
      },
      {
        "id": "lb1-27",
        "value": "Hier. in Ier."
      },
      {
        "id": "lb1-28",
        "value": "Isidorus episcopus Hispalensis (saec. VI-VII)"
      },
      {
        "id": "lb1-29",
        "value": "Iulius Rufinianus (saec. IV)"
      },
      {
        "id": "lb1-30",
        "value": "L. Caelius Firmianus Lactantiu... (saec. III med.)"
      },
      {
        "id": "lb1-31",
        "value": "Macrobius Ambrosius Theodosius (saec. V)"
      },
      {
        "id": "lb1-32",
        "value": "Macrobius Ambrosius Theodosius (saec. V in.)"
      },
      {
        "id": "lb1-33",
        "value": "Flavius Mallius Theodorus (saec. IV-V)"
      },
      {
        "id": "lb1-34",
        "value": "Gaius Marius Victorinus (saec. IV)"
      },
      {
        "id": "lb1-35",
        "value": "Maximus (Maximinus?)"
      },
      {
        "id": "lb1-36",
        "value": "Nonius Marcellus (saec. IV)"
      },
      {
        "id": "lb1-37",
        "value": "E. Dummler, L. Traube, K..."
      },
      {
        "id": "lb1-38",
        "value": "Petron."
      },
      {
        "id": "lb1-39",
        "value": "Philarg. Verg."
      },
      {
        "id": "lb1-40",
        "value": "Pompeius (saec. V-VI)"
      },
      {
        "id": "lb1-41",
        "value": "Pomponius Porphyrio (saec. III)"
      },
      {
        "id": "lb1-42",
        "value": "Priscianus Caesariensis (saec. V-VI)"
      },
      {
        "id": "lb1-43",
        "value": "Prob. cath. gramm., pp. 3-43."
      },
      {
        "id": "lb1-44",
        "value": "Marcus Valerius Probus (saec. I-II, cum additamentis saec...)"
      },
      {
        "id": "lb1-45",
        "value": "Marcus Valerius Probus (saec. I-II, cum additamentis saec...)"
      },
      {
        "id": "lb1-46",
        "value": "Probi qui dicitur Commentarius in... (cf. etiam M. Gioseffi, Studi sul...)"
      },
      {
        "id": "lb1-47",
        "value": "Asper cui ascribuntur artes... (saec. VI?)"
      },
      {
        "id": "lb1-48",
        "value": "Iulius Rufinianus (non ante saec. IV)"
      },
      {
        "id": "lb1-49",
        "value": "Ps. Iul. Ruf. schem. lex."
      },
      {
        "id": "lb1-50",
        "value": "M. Fabius Quintilianus (saec. I)"
      },
      {
        "id": "lb1-51",
        "value": "Marius Plotius Sacerdos (saec. III)"
      },
      {
        "id": "lb1-52",
        "value": "Acronis quae dicuntur scholia in..."
      },
      {
        "id": "lb1-53",
        "value": "Scholia in Iuvenalem vetustiora,..."
      },
      {
        "id": "lb1-54",
        "value": "Lactantius Placidus (saec. V-VI)"
      },
      {
        "id": "lb1-55",
        "value": "Scholia in Terentium Bembina. Cod..."
      },
      {
        "id": "lb1-56",
        "value": "Scholia Bernensia ad Vergili..."
      },
      {
        "id": "lb1-57",
        "value": "Scholia in Vergili Bucolica quae..."
      },
      {
        "id": "lb1-58",
        "value": "Scholia in Vergilium quae cod... (ed. H. Hagen, Lipsiae 1902)"
      },
      {
        "id": "lb1-59",
        "value": "Sergius (non ante Servius)"
      },
      {
        "id": "lb1-60",
        "value": "Servius (saec. V in.)"
      },
      {
        "id": "lb1-61",
        "value": "Scholia Serviana inserta,..."
      },
      {
        "id": "lb1-62",
        "value": "Tituli Pompeiani (C.I.L. IV cum supplementis)"
      },
      {
        "id": "lb1-63",
        "value": "Terentianus Maurus (saec. II-III)"
      },
      {
        "id": "lb1-64",
        "value": "Victorinus (Marius?)"
      },
      {
        "id": "lb1-65",
        "value": "Incerti de ultimis syllabis liber... (1864)"
      }
    ]
  }
}
```

## Fragment/Comment

```json
{
  "location": "1.2",
  "baseText": "asyndeton",
  "tag": "scholarly",
  "text": "This is a very erudite comment.\nNot for *everyone*!"
}
```

The thesaurus is optional. When not set, the editor allows free text for the tag.

```json
{
  "comment-tags": {
    "id": "comment-tags",
    "language": "ita",
    "entries": [
      { "id": "red", "value": "rosso" },
      { "id": "green", "value": "verde" },
      { "id": "blue", "value": "blu" }
    ]
  }
}
```

## Fragment/Chronology

```json
{
  "location": "1.2",
  "baseText": "Marathonis",
  "date": {
    "a": {
      "value": -490
    }
  },
  "label": "battle of Marathon",
  "tag": "bat"
}
```

The thesaurus is optional. When not set, the editor allows free text for the tag.

```json
{
  "chronology-tags": {
    "id": "chronology-tags",
    "language": "eng",
    "entries": [
      { "id": "bat", "value": "battle" },
      { "id": "prst", "value": "priesthood" },
      { "id": "cos", "value": "consulship" }
    ]
  }
}
```

## Fragment/Orthography

```json
{
  "location": "1.2",
  "baseText": "bixit",
  "standard": "vixit",
  "operations": ["\"b\"@1x1=\"v\""]
}
```

No thesaurus is required for this part.

## Fragment/Quotations

```json
{
  "location": "1.2",
  "entries": [
    {
      "author": "verg",
      "work": "verg.aen",
      "citation": "1.1",
      "citationUri": "urn:vergaen",
      "variant": "arma virumque cano Troiae qui primus ab undis",
      "note": "a fake variant"
    },
    {
      "author": "sen",
      "work": "sen.ep",
      "citation": "16.98",
      "citationUri": "urn:senep",
      "variant": "potest fortunam cavere is qui potest ferre",
      "note": "added is"
    }
  ]
}
```

Optional thesauri: `quotation-works`, `quotation-tags`.

```json
{
  "quotation-tags": {
    "id": "quotation-tags",
    "language": "eng",
    "entries": [
      { "id": "anc", "value": "ancient" },
      { "id": "hum", "value": "humanistic" },
      { "id": "mod", "value": "modern" }
    ]
  },
  "quotation-works": {
    "id": "quotation-works",
    "language": "eng",
    "entries": [
      { "id": "verg", "value": "Vergilius" },
      { "id": "verg.ecl", "value": "eclogae" },
      { "id": "verg.georg", "value": "georgica" },
      { "id": "verg.aen", "value": "Aeneis" },
      { "id": "sen", "value": "Seneca" },
      { "id": "sen.apocol", "value": "apocolocyntosis" },
      { "id": "sen.ben", "value": "de beneficiis" },
      { "id": "sen.clem", "value": "de clementia" },
      { "id": "sen.constant", "value": "de constantia sapientis" },
      { "id": "sen.dial", "value": "dialogi" },
      { "id": "sen.ep", "value": "epistulae ad Lucilium" },
      { "id": "sen.epigr", "value": "epigrammata super exilio" },
      { "id": "sen.helv", "value": "ad Helviam" },
      { "id": "sen.med", "value": "Medea" },
      { "id": "sen.prov", "value": "de providentia" },
      { "id": "sen.qnat", "value": "quaestiones naturales" },
      { "id": "sen.tranq", "value": "de tranquillitate animi" }
    ]
  }
}
```
