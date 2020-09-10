// The modal window component

<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__header">
        <slot name="header">
          <i class="fas fa-times-circle modal__btn-close" @click="$emit('close')"></i>
        </slot>
      </div>
      <div class="modal__body">
        <slot name="body" />
      </div>
      <div class="modal__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal'
}
</script>
