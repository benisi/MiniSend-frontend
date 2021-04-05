<template>
    <v-dialog v-model="status" fullscreen>
        <div class="fluid fill-height">
            <div class="layout justify-center align-center fill-height">
                <div class="d-flex align-center flex-column">
                <v-progress-circular
                        indeterminate
                        :size="70"
                        color="white"
                        
                ></v-progress-circular>
                
                <v-chip v-if="message" class="mt-5 bg">{{
                        message
                    }}</v-chip>
                </div>
            </div>
        </div>
    </v-dialog>
</template>

<script>
export default {
    props: ['status', 'message'],
}
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.bg {
    background-color: $mariner !important;
    color: $white !important;
}
div.layout.justify-center.align-center {
    background-color: rgba(0, 0, 0, 0.6);
}
</style>
