// The form component [creates/updates] a contact

<template>
  <div class="">
    <form class="form" @submit.prevent="updateContact">
      <div class="">
        <div class="form__content">
          <div class="form__input-group">
            <label class="form-label" for="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              class="form__input"
              v-model="updatedContact.name"
              required />
          </div>
          <div class="form__input-group">
            <label class="form-label" for="contact-phone">
              Phone
            </label>
            <input
              id="contact-phone"
              type="text"
              class="form__input"
              v-model="updatedContact.phone"
              required />
          </div>
          <div class="form__input-group">
            <label class="form-label" for="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              class="form__input"
              v-model="updatedContact.email"
              required />
          </div>
          <div class="form__input-group">
            <progress class="form-progress" value="0" max="100" ref="progressImg">0%</progress>
            <input style="display: none" type="file" @change="selectedImg" ref="inputImg" />
          </div>
          <div class="form__input-group">
            <div class="">
              File avatar:&nbsp;
              <span>{{selectedImgName}}</span>
            </div>
          </div>
          <div class="form__input-group">
            <img v-if="imgUrl" :src="imgUrl" :alt="imgFileName" class="card__img">
          </div>
          <div class="form__input-group">
            <div class="">
              <button type="button" class="btn form__btn" @click="$refs.inputImg.click()">
                Donwload
              </button>
              <button type="button" class="btn form__btn" @click="uploadUpdatedImg()" :disabled="isUpdloadDisabled">Updload</button>
            </div>
          </div>
          <button type="submit" class="btn form__btn form--btn-create">{{textSubmitButton}}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import mixinUploadImg from '../mixins/uploadImg'
import { compareObjects } from '../utils/utils'

export default {
  name: 'Form',
  data () {
    return {
      imgFile: null,
      imgUrl: null,
      imgFileName: '',
      updatedContact: { ...this.contact }
    }
  },
  props: {
    contact: {
      type: Object,
      default: () => {}
    },
    textSubmitButton: {
      type: String,
      required: true
    }
  },
  watch: {
    imgUrl (newUrl) {
      this.updatedContact.avatar = newUrl
    }
  },
  computed: {
    isUpdloadDisabled () {
      return !this.imgFile
    },
    selectedImgName () {
      return this.imgFileName
    }
  },
  methods: {
    uploadUpdatedImg () {
      this.uploadImg(this.updatedContact.imgFileName, this.imgFile)
    },
    updateContact () {
      if (compareObjects(this.updatedContact, this.contact || {})) return
      this.$emit('submit', this.updatedContact)
    },
    selectedImg (event) {
      this.imgFile = event.target.files[0]
      this.imgFileName = this.updatedContact.imgFileName = this.imgFile.name
    }
  },
  mixins: [
    mixinUploadImg
  ]
}
</script>
