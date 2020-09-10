<template>
  <div class="card">
    <router-link class="card__link" :to="{ name: 'ContactDetails', params: { id: data.id } }">
      <div class="card__img">
        <img class="card__avatar" :src="data.avatar" :alt="data.name">
      </div>
      <div class="card__body">
        <span class="card__title">{{data.name}}</span>
        <span class="card__info">{{data.phone}}</span>
      </div>
    </router-link>
    <div class="card__footer">
      <div class="card__controls">
        <button type="button" class="card__btn-control card--green">
          <i class="fas fa-edit"></i>
        </button>
        <span class="card__vertical-delimiter" />
        <button type="button" class="card__btn-control card--red" @click="deleteContact">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteContact, deleteImg } from '../api/contact-book'

export default {
  name: 'Card',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    deleteContact () {
      if (this.data?.imgFileName && this.data?.id) {
        deleteImg(this.data.imgFileName)
        deleteContact(this.data.id)
      }
    }
  }
}
</script>
