// The contact details view

<template>
  <section v-if="isReady" class="contact-details">
    <AlertModal
      :visible="showModal"
      :mark="keyFieldToDelete"
      @handleOk="deleteField"
      @close="toggleModal" />
    <div class="container">
      <div class="column">
        <button type="button" class="btn btn-back" @click="() => this.$router.go('-1')">
          <i class="fas fa-arrow-circle-left fa-3x"></i>
        </button>
        <div class="contact-details__content box">
          <div class="contact-details__avatar">
            <h2 class="capitalize">{{contact.name}}</h2>
            <img v-if="contact.avatar" :src="contact.avatar" :alt="contact.name">
            <img v-else src="https://via.placeholder.com/720?text=Avatar" :alt="contact.name">
          </div>
          <div class="contact-details__info">
            <p v-for="[key, value] in Object.entries(fields)" :key="key">
              <b class="capitalize">{{key}}:</b> {{value}}
              <i class="fas fa-edit green m-1" @click="editField(key)"></i>
              <i class="fas fa-times red m-1 fa-lg" @click="toggleModal(key)"></i>
            </p>
            <div class="contant-details_new-fields">
              <form class="form">
                <div class="form__row">
                  <div class="form__input-group">
                    <input
                      type="text"
                      placeholder="New field..."
                      class="form__input"
                      v-model="newField.field"
                      required />
                  </div>
                  <div class="form__input-group">
                    <input
                      type="text"
                      placeholder="Value..."
                      class="form__input"
                      v-model="newField.value"
                      required />
                  </div>
                  <div class="form__input-group">
                    <button
                      type="button"
                      class="btn form__btn form--btn-create contact-details--btn-add"
                      @click="updateBook"
                      :disabled="isAddDisabled">
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { deleteField, fetchContact, updateContact } from '../api/contact-book'
import AlertModal from '../components/AlertModal'

export default {
  name: 'contact-details',
  data () {
    return {
      contactId: '',
      contact: null,
      contactFields: {},
      isReady: false,
      newField: {},
      showModal: false,
      keyFieldToDelete: null
    }
  },
  async created () {
    this.contactId = this.$route.params.id
    this.contact = await fetchContact(this.contactId)
    this.contactFields = { ...this.contact }
    this.isReady = true
  },
  computed: {
    fields () {
      const data = {}
      if (this.isReady) {
        for (const [key, value] of Object.entries(this.contactFields)) {
          if (key === 'name') continue
          data[key] = value
        }
      }
      return data
    },
    isAddDisabled () {
      return !this.newField.field || !this.newField.value
    }
  },
  methods: {
    toggleModal (keyField) {
      this.keyFieldToDelete = keyField
      this.showModal = !this.showModal
    },
    updateBook () {
      if (!this.isAddDisabled) {
        const field = { [this.newField.field]: this.newField.value }
        updateContact(this.contactId, field)
        this.contactFields = { ...this.contactFields, ...field }
      }
    },
    deleteField () {
      deleteField(this.contactId, this.keyFieldToDelete)
      delete this.contactFields[this.keyFieldToDelete]
      this.contactFields = { ...this.contactFields }
      this.toggleModal()
    },
    editField () {
    }
  },
  components: {
    AlertModal
  }
}
</script>
