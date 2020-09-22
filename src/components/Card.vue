<template>
  <div class="card box">
    <Modal v-if="showModal" @close="toggleModal">
      <template #body>
        <div class="text-center" v-html="`<strong>Are you sure you want to delete the <mark>${data.name}</mark>?</strong>`"></div>
      </template>
      <template #footer>
        <button type="button" class="btn modal__btn modal--red" @click="deleteContact">
          Yes
        </button>
        <button type="button" class="btn modal__btn modal--green" @click="toggleModal">
          Cancel
        </button>
      </template>
    </Modal>
    <router-link class="card__link" :to="{ name: 'ContactDetails', params: { id: data.id } }">
      <div class="card__img">
        <img v-if="data.avatar" class="card__avatar" :src="data.avatar" :alt="data.name">
        <img v-else class="card__avatar" src="https://via.placeholder.com/360?text=Avatar" :alt="data.name">
      </div>
      <div class="card__body">
        <span class="card__title">{{data.name}}</span>
        <span class="card__info">{{data.phone}}</span>
        <span class="card__info">{{data.email}}</span>
      </div>
    </router-link>
    <div class="card__footer">
      <div class="card__controls">
        <router-link class="card__btn-control card--green" :to="{ name: 'ContactDetails', params: { id: data.id } }">
          <i class="fas fa-edit"></i>
        </router-link>
        <span class="card__vertical-delimiter" />
        <button type="button" class="card__btn-control card--red" @click="toggleModal">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '../components/Modal'
import { deleteContact, deleteImg } from '../api/contact-book'
import { isEmpty } from '../utils/utils'

export default {
  name: 'Card',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    toggleModal () {
      this.showModal = !this.showModal
    },
    deleteContact () {
      if (!isEmpty(this.data) && this.data.id) {
        this.data.avatarImg && deleteImg(this.data.avatarImg)
        deleteContact(this.data.id)
        this.$emit('deleteContact', this.data.id)
        this.toggleModal()
      }
    }
  },
  components: {
    Modal
  }
}
</script>
