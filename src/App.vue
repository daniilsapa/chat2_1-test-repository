<template>
    <div class="component-app">

        <div class="container app-header-container">
            <app-header></app-header>
        </div>

        <div class="header-divider"></div>

        <div class="container">
            <app-content></app-content>
        </div>

        <div class="error-box-wraper">
            <div class="container">
                <error-box class="errbox"></error-box>
            </div>
        </div>

    </div>
</template>

<script>
    //IMPORTED COMPONENTS
    import AppHeader from './components/Header/Header.vue';
    import AppContent from './components/Content/Content.vue'
    import ErrorBox from './components/ErrorBox/ErrorBox.vue';
    //IMPORTED MAPPERS
    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';

    export default {
        name: 'App',
        computed: {
            ...mapGetters({
                unauthorized: 'SOCKET_IO_G_GET_UNAUTHORIZED'
            })
        },
        components: {
            AppHeader,
            AppContent,
            ErrorBox,
        },
        watch: {
          unauthorized(newValue) {
              if(newValue){
                  const data = JSON.parse(localStorage.getItem('data'));

                  data.token = null;
                  localStorage.setItem('data', JSON.stringify(data));
                  this.$router.push('/');
              }
          }
        },
        methods: {
            ...mapActions({
                initApp: 'APP_A_INIT_APP'
            })
        },
        created() {
            this.initApp();
        },
    }
</script>

<style lang="scss">
    .header-divider {
        margin: 0 0 10px 0;
    }

    body {
        background: rgba(245, 245, 245, 1);
    }

    .error-box-wraper {
        width: 100%;

        position: fixed;
        bottom: 10px;
        z-index: 9999;

        .container {
            position: relative;
        }
    }
</style>
