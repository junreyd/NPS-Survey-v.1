Vue.component("graphLine", {
    props: ["labels", "detractors", "passives", "promoters", "year",
        "type"
    ],
    template: '<canvas id="graphline"></canvas>',
    mounted: function () {
        new Chart(this.$el, {
            type: this.type,
            data: {
                labels: this.labels,
                datasets: [{
                        label: "Detractors",
                        data: this.detractors,
                        borderColor: [
                            "rgba(255,99,132,1)"
                        ],
                        borderWidth: 2
                    },
                    {
                        label: "Passives",
                        data: this.passives,
                        borderColor: [
                            "rgba(255, 159, 64, 1)"
                        ],
                        borderWidth: 2
                    },
                    {
                        label: "Promoters",
                        data: this.promoters,
                        borderColor: [
                            "rgb(0, 166, 90)"
                        ],
                        borderWidth: 2
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            precision: 0,
                            beginAtZero: true,
                        }
                    }]
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                        },
                    }]
                }
            }
        });
    }
});

new Vue({
    el: "#appa",
    data() {
        return {
            loaded: false,
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            detractors_value: null,
            passives_value: null,
            promoters_value: null
        }
    },
    created: function () {
        this.getListData();
    },
    methods: {
        getListData: function () {
            this.loaded = false;
            // var vm = this;
            axios.get(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbyTitle('ENPS Survey Score Storage')/items", {
                headers: {
                    "accept": "application/json;odata=verbose"
                }
            }).then(response => {

                var arr_month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let result = response.data.d.results;
                var dates = new Date();
                var current_month = arr_month[dates.getMonth()];
                console.log();

                // let det = result.map(a => a.Detractors)
                // let pass = result.map(a => a.Passives)
                // let prom = result.map(a => a.Promoters)

                var obj_passives = [];
                var obj_detractors = [];
                var rowLen = result.length;
                var total_detractors = 0;
                var total_passives = 0;


                result.map((rank, i) => {
                    // if (rank.Year === "2019" && rank.Month === "January") {

                    if (rank.Detractors === null && rank.Passives === null) return rank
                    total_detractors = total_detractors + Number(rank.Detractors);

                    total_passives = total_passives + Number(rank.Passives);

                    // }

                    // if (rank.Detractors === null) return rank
                    // if (rowLen === i + 1) {
                    //     obj_detractors.push(rank.Detractors);
                    //     console.log(rank.Detractors);
                    // }

                });

                console.log(total_detractors);

                obj_detractors.push(total_detractors);
                obj_passives.push(total_passives);


                this.passives_value = obj_passives;
                this.detractors_value = obj_detractors;
                this.loaded = true;

            });
        }
    }
});