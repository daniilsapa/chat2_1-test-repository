<template>
    <div v-if="typingUsers && typingUsers.length > 0" class="typing-users text-left">
        <div class="ml-2 string">{{ string }}</div>
    </div>
</template>

<script>
    export default {
        name: 'TypingUsers',
        props: ['typingUsers'],
        computed: {
            string() {
                if(this.typingUsers){
                    const user = this.$store.getters['SESSION_G_GET_CURRENT_USER'];
                    let usersQuantity;

                    this.typingUsers.forEach((item, index) => {
                        if(item === user.username){
                            this.typingUsers.splice(index, 1);
                        }
                    });

                    usersQuantity = this.typingUsers.length > 2? `and ${ this.typingUsers.length - 2 } others`: '';

                    if(this.typingUsers.length === 1){
                        return `${ this.typingUsers[0] } is typing now `
                    }
                    else if(this.typingUsers.length > 1){
                        return `${ this.typingUsers[0] }, ${ this.typingUsers[1] } ${ usersQuantity } are typing now `
                    }
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .typing-users{
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;

        border: 1px solid rgba(210, 210, 210, 1);

        .string {
            font-weight: 500;
            color: rgba(180, 180, 180, 1);
        }
    }
</style>