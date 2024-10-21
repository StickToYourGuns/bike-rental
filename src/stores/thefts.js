import { defineStore } from 'pinia'
import axios from 'axios'

export const useTheftStore = defineStore('theft', {
    state: () => ({
        theftForm: {
            licenseNumber: '',
            ownerFullName: '',
            type: '',
            color: '',
            date: '',
            about: '',
        },
        cases: '',
        error: ''
    }),
    getters: {

    },
    actions: {
        async createCase(payload) { //FOR OFFICERS
            console.log(payload);

            this.error = '';
            try {
                let response = await axios.post('https://sf-final-project-be.herokuapp.com/api/cases/', {
                    ...payload
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}`,
                        }
                    });
                if (response.status === 200) {

                } else {
                    this.error = response.data.message;
                }
            } catch (error) {
                this.error = error.data.message;
            }
        },

        async createCasePublic(payload) { //PUBLIC
            this.error = '';
            try {
                let response = await axios.post('https://sf-final-project-be.herokuapp.com/api/public/report', {
                    ...payload
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        }
                    });
                if (response.status === 200) {

                } else {
                    this.error = response.data.message;
                }
            } catch (error) {
                this.error = error;
            }
        },

        async getAllCases() {
            try {
                let response = await axios.get('https://sf-final-project-be.herokuapp.com/api/cases/', {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'headers': { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}` },
                });
                if (response.status == 200) {
                    this.cases = response.data.data;
                } else {
                    console.log('Something went wrong');
                }
            } catch (err) {
                console.log(err);
            }
        },

        async editCase(step, id, resolution) {
            this.error = '';
            if (step === 1) {
                try {
                    let response = await axios.put(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, {
                        "status": "in_progress",
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
                        await this.getAllCases();
                    } else {
                        this.error = response.data.message;
                    }
                } catch (error) {
                    console.log(error);
                    this.error = error.response.data.message;
                }
            } else if (step === 2) {
                try {
                    let response = await axios.put(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, {
                        "status": "done",
                        "resolution": resolution,
                    },
                        {
                            'headers': {
                                Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}`,
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                        });
                    if (response.status === 200) {
                        await this.getAllCases();
                    } else {
                        this.error = response.data.message;
                    }
                } catch (error) {
                    this.error = error.response.data.message;
                }

            } else if (step === 3) {
                try {
                    let response = await axios.delete(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'headers': { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}` },
                    });
                    if (response.status === 200) {
                        await this.getAllCases();
                    } else {
                        this.error = response.data.message;
                    }
                } catch (error) {
                    this.error = error.response.data.message;
                }
            }
        },
    }
})