<template>
  
</template>

<script>
export default {
    props: {
        /**
         * 附件
         */
        attachment: Object
    },
    data(){
        return {
            attachmentIcons: [
                {extension: 'jpeg', icon: 'mdi-file-image' },
                {extension: 'png', icon: 'mdi-file-image' },
                {extension: 'pngx', icon: 'mdi-file-image' },
                {extension: 'jpg', icon: 'mdi-file-image' },
                {extension: 'gif', icon: 'mdi-file-image' },
                {extension: 'bmp', icon: 'mdi-file-image' },
                {extension: 'mp3', icon: 'mdi-file-music' },
                {extension: 'wav', icon: 'mdi-file-music' },
                {extension: 'wma', icon: 'mdi-file-music' },
            ]
        }
    }
}
</script>

<style>

</style>