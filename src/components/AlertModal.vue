<template>
  <Modal v-if="visible" @close="close">
    <template #body>
      <div class="text-center" v-html="`<strong>Are you sure you want to delete the <mark>${mark}</mark>?</strong>`"></div>
    </template>
    <template #footer>
      <button type="button" class="btn modal__btn modal--red" @click="handleOk">
        Yes
      </button>
      <button type="button" class="btn modal__btn modal--green" @click="close">
        Cancel
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'AlertModal',
  props: {
    mark: String,
    visible: Boolean
  },
  methods: {
    handleOk () {
      this.$emit('handleOk')
    },
    close () {
      this.$emit('close')
    }
  },
  components: {
    Modal
  }
}

</script>
