<script setup lang="ts">
import { useCounterStore } from '../main.ts'

const store = useCounterStore()
</script>

<template>
{{ store.count }}
</template>

<style scoped>

</style>