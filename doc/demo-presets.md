# Demo Presets

Here you can find some presets for model and thesauri to be used in the app's demo pages. Just open the corresponding page under the `Demo` menu, and in the JSON code view paste the first JSON document in the _model_, and the second one (if any) in the _thesauri_; then click the `Apply` button. You will be lead to the visual editor, and be able to experiment its functionality.

From the visual view you can then save, and go back to the JSON code view. You can freely go back and forth between these two views, even if only the visual one will appear to the end-user. This is just a demo/test environment, where you can quickly experiment with each part or fragment editor.

## Part/Categories

```json
{
  "itemId": "4a26ad5c-0a82-4a21-b1d7-15cddbb1bfd1",
  "id": "1bf411d8-54ad-4f4c-bde6-2fc78226ebd5",
  "typeId": "net.fusisoft.note",
  "roleId": "",
  "timeModified": "2019-11-29T16:48:49.694Z",
  "userId": "zeus",
  "categories": ["green"]
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
  "typeId": "net.fusisoft.keywords",
  "roleId": "",
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

## Part/Note

```json
{
  "itemId": "4a26ad5c-0a82-4a21-b1d7-15cddbb1bfd1",
  "id": "1bf411d8-54ad-4f4c-bde6-2fc78226ebd5",
  "typeId": "net.fusisoft.note",
  "roleId": "",
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
    "id": "colors",
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
  "typeId": "net.fusisoft.note",
  "roleId": "",
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

## Part/Token Text Part

```json
{
  "itemId": "4a26ad5c-0a82-4a21-b1d7-15cddbb1bfd1",
  "id": "1bf411d8-54ad-4f4c-bde6-2fc78226ebd5",
  "typeId": "net.fusisoft.note",
  "roleId": "",
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
  "typeId": "net.fusisoft.tiled-text-part",
  "roleId": null,
  "timeModified": "2019-12-10T20:31:31.7000245Z",
  "userId": "zeus",
  "citation": "1.2",
  "rows": [
    {
      "y": 1,
      "tiles": [
        {
          "x": 1,
          "data": {
            "text": "one",
            "id": "t1"
          }
        },
        {
          "x": 2,
          "data": {
            "text": "two",
            "id": "t2"
          }
        },
        {
          "x": 3,
          "data": {
            "text": "three",
            "id": "t3"
          }
        }
      ],
      "data": {
        "id": "r1"
      }
    },
    {
      "y": 2,
      "tiles": [
        {
          "x": 1,
          "data": {
            "text": "four",
            "id": "t4"
          }
        },
        {
          "x": 2,
          "data": {
            "text": "five",
            "id": "t5"
          }
        }
      ]
    }
  ]
}
```

No thesaurus is required for this part.

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
      "value": 123,
      "isApproximate": true
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
  "operations": [
    "\"b\"@1x1=\"v\""
  ]
}
```

No thesaurus is required for this part.
