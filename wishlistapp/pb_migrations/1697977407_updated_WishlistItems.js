/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jwpj50wx64zy9if")

  collection.listRule = "@request.auth.id != \"\""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jwpj50wx64zy9if")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
