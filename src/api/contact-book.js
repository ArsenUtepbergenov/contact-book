import { db, storage } from '../firebase/firebase'

async function fetchContacts () {
  try {
    const contacts = []
    const result = await db.collection('contacts').get()
    for (const doc of result.docs) {
      const dataDoc = {
        id: doc.id, ...doc.data()
      }
      contacts.push(dataDoc)
    }
    return contacts
  } catch (error) {
    console.error('Error: cannot get contacts collection: ', error)
  }
}

async function fetchContact (id) {
  try {
    const result = await db.collection('contacts').doc(id).get()
    return result.data()
  } catch (error) {
    console.error(`Error: cannot get a contact with id = ${id}: `, error)
  }
}

async function deleteContact (id) {
  try {
    await db.collection('contacts').doc(id).delete()
    console.log(`The contact with id ${id}, successfully deleted!`)
  } catch (error) {
    console.error(`Error: cannot delete the contact with id - ${id}: `, error)
  }
}

async function updateContact (id, book) {
  try {
    await db.collection('contacts').doc(id).update(book)
    console.log(`The contact with id ${id}, successfully updated!`)
  } catch (error) {
    console.error(`Error: cannot update the contact with id - ${id}: `, error)
  }
}

async function createContact (data) {
  try {
    const docRef = await db.collection('contacts').add(data)
    console.log(`The contact with id ${docRef.id}, successfully created!`)
    return docRef.id
  } catch (error) {
    console.error(`Error: cannot create the contact with data - ${data}: `, error)
  }
}

async function deleteImg (fileName) {
  try {
    const imgRef = storage.ref().child(fileName)
    await imgRef.delete()
    console.log(`The ${fileName} in storage successfully deleted!`)
  } catch (error) {
    console.error(`Error: cannot delete the ${fileName}: `, error)
  }
}

export {
  fetchContacts,
  fetchContact,
  deleteContact,
  updateContact,
  createContact,
  deleteImg
}
