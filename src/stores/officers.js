import { defineStore } from 'pinia'
import axios from 'axios'

export const useOfficersStore = defineStore('officers', {
    state: () => ({
        // theftForm: {
        //     licenseNumber: '',
        //     ownerFullName: '',
        //     type: '',
        //     color: '',
        //     date: '',
        //     about: '',
        // },
        officers: [],
        error: '',
        updated: false
    }),
    getters: {
    },
    actions: {
        // async createCase(payload) { //FOR OFFICERS
        //     console.log(payload);

        //     this.error = '';
        //     try {
        //         let response = await axios.post('https://sf-final-project-be.herokuapp.com/api/cases/', {
        //             ...payload
        //         },
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Accept': 'application/json',
        //                 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}`,
        //             }
        //         });
        //         if (response.status === 200) {

        //         } else {
        //             this.error = response.data.message;
        //         }
        //     } catch (error) {
        //         this.error = error.data.message;
        //     }
        // }, 

        // async createCasePublic(payload) { //PUBLIC
        //     console.log(payload);

        //     this.error = '';
        //     try {
        //         let response = await axios.post('https://sf-final-project-be.herokuapp.com/api/public/report', {
        //             ...payload
        //         },
        //             {
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     'Accept': 'application/json',
        //                 }
        //             });
        //         if (response.status === 200) {

        //         } else {
        //             this.error = response.data.message;
        //         }
        //     } catch (error) {
        //         this.error = error.data.message;
        //     }
        // }, 

        async getAllOfficers() {
            try {
                let response = await axios.get('https://sf-final-project-be.herokuapp.com/api/officers/', {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'headers': { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}` },
                });
                if (response.status == 200) {
                    this.officers = response.data.officers;
                } else {
                    console.log('Something went wrong');
                }
            } catch (err) {
                console.log(err);
            }
        },
        async approveOfficer(id) {
            this.error = '';
            try {
                let response = await axios.put(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, {
                    "approved": "true",
                    "officer": JSON.parse(localStorage.getItem('userInfo')).id,
                },
                    {
                        'headers': {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    });
                if (response.status === 200) {
                    await this.getAllOfficers();
                } else {
                    this.error = response.data.message;
                }
            } catch (error) {
                console.log(error);
                this.error = error.response.data.message;
            }
        },
        async updateOfficer(id, payload) {
            this.error = '';
            try {
                let response = await axios.put(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, {
                    ...payload
                },
                    {
                        'headers': {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    });
                if (response.status === 200) {
                    await this.getAllOfficers();
                    this.updated = true;
                } else {
                    this.error = response.data.message;
                }
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        async deleteOfficer(id) {
            try {
                let response = await axios.delete(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'headers': { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}` },
                });
                if (response.status === 200) {
                    await this.getAllOfficers();
                } else {
                    this.error = response.data.message;
                }
            } catch (error) {
                console.log(error);
                this.error = error.response.data.message;
            }
        }
    }
})