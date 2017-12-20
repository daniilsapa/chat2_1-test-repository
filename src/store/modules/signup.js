import Vue from 'vue';
import _ from 'lodash';

import { ErrorHandler } from "../../services/ErrorHandler.secvice"

const state = {
    form: {
        username: {value: '', state: false},
        email: {value: '', state: false},
        phone: {value: '', state: false},
        password: {value: '', state: false},
        passwordConf: {value: '', state: false},
        age: {value: '', state: false},
        gender: {value: 'male', state: true}
    },
    isValid: false,
    serverResponse: {errmsg: ''}
};

const mutations = {
    'SIGN_UP_M_SET_FIELD'(stateS, {field, state, value}) {

        const form = _.cloneDeep(stateS.form);

        form[field]['state'] = state;
        form[field]['value'] = value;

        stateS.form = form;

    },
    'SIGN_UP_M_VALIDATE_FORM'(state) {
        for(let key in state.form) {
            if(!state.form[key]['state']){
                state.isValid = false;
                return;
            }
        }

        state.isValid = true;
    },

};

const actions = {
    'LOGIN_SEND_A_SIGN_UP_REQUEST'({ state, dispatch, commit }) {
        const newUser = {};

        for(let key in state.form){
            newUser[key] = state.form[key]['value'];
        }

        Vue.http.post('/auth/user', newUser)
            .then(response => {
                const data = response.body;

                if(data.token){
                    commit('SOCKET_IO_M_CLOSE_CONNECTIONS');
                    setTimeout(() => {
                        dispatch('LOCAL_STORAGE_A_SET_TOKEN', data.token.split(' ')[1]);
                        dispatch('APP_A_INIT_APP');
                    }, 100)

                }
                else{
                    ErrorHandler.pushError({ message: 'Account successfully created, but automatic log in is not available right now. Please do it manually.' })
                }
            })
            .catch(error => {
                if(error.body.errmsg){
                    state.serverResponse = error.body
                }
                else{
                    ErrorHandler.pushError({ message: 'Unknown issue' })

                }
            });

    }
};

const getters = {
    'SIGN_UP_G_GET_FORM'(state) {
        return state.form;
    },
    'SIGN_UP_G_GET_IS_VALID'(state) {
        return state.isValid;
    },
    'SIGN_UP_G_GET_SERVER_RESPONSE'(state) {
        return state.serverResponse;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
