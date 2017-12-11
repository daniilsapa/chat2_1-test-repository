//IMPORTED MODULES
import axios from 'axios';
//IMPORTED SERVICES
import { ErrorHandler } from "../services/ErrorHandler.secvice";

export const ValidationMixin = {
    data() {
        return {
            errorMessage: '',
            isTouched: '',
            isValid: false,
            newValue: ''
        }
    },
    methods: {
        validate() {
            if (this.isTouched) {
                this.isTouched = false
            }

            if (this.newValue.length === 0 && this.validationRules === 1) {
                this.isValid = false;
                this.errorMessage = 'Field mustn\'t be empty!';
            }
            else if (!this.newValue.match("^[A-Za-z0-9_.]+$") && this.validationRules <= 2) {
                this.isValid = false;
                this.errorMessage = 'Entered username is not valid!';
            }

            if(this.validationRules <= 3) {
                axios.get('/public/check/username')
                    .then(response => {
                        if(response.data.result){
                            this.isValid = false;
                            this.errorMessage = `This ${this.fieldName} already exists!`;
                        }
                    })
                    .catch(error => {
                         ErrorHandler.pushError({ message: 'An issue with server-side validation!' })
                    });
            }
            else {
                this.isValid = true;
            }
        }
    }
};