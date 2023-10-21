/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jwpj50wx64zy9if")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pxk0gktr",
    "name": "Item_link",
    "type": "url",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jwpj50wx64zy9if")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pxk0gktr",
    "name": "Link",
    "type": "url",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
})
