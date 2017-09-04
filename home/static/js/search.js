$(document).ready(function () {

    var _self;

    var SearchModule = {

        _lat: 0,
        _long: 0,

        init: function () {

            _self = this;

            _self.initSearchForm();

        },

        trim: function (str) {
            return str.replace(/^s+|s+$/g, '');
        },

        getGoogleApiUrl: function (cep) {
            if (cep == undefined) return '';
            return 'http://maps.google.com/maps/api/geocode/json?address=' + cep + '%20-%20Brasil&sensor=false'
        },

        testCepFormat: function (cep) {
            var regexCep = /^[0-9]{2}\.?[0-9]{3}-[0-9]{3}$/;
            return regexCep.test(_self.trim(cep));
        },

        initSearchForm: function () {

            var form = $('form#id_form_cep_search');

            form.find('input#id_cep_search').mask('00.000-000');

            $('a#id_form_cep_search_submit').on('click', function (e) {
                e.preventDefault();
                form.trigger('submit');
            });

            form.on('submit', function (e) {
                e.preventDefault();

                var cep = $(this).find('input#id_cep_search').val();

                if (_self.testCepFormat(cep)) {
                    var url = _self.getGoogleApiUrl(cep);
                    $.get(url, function (data) {
                        _self.loadData(data);
                    });
                } else {
                    alert('CEP incorreto. Ex: 14060-000 ou 02060-000');
                    return;
                }

            });
        },

        loadData: function (data) {

            if (data.status == 'OK' && data.results.length > 0) {
                var result = data.results[0];
                if (confirm('Encontrado o endereço em: ' + result.formatted_address + '. Confere?')) {
                    var lat = result.geometry.location.lat,
                        lng = result.geometry.location.lng
                    window.location.href = '/profissionais/?lat=' + lat + '&lng=' + lng;
                }

            } else {
                alert('CEP não encontrado, por favor coloque um CEP válido ou \nverifique com nossa equipe comercial se atendemos sua região.');
            }

        }

    };

    SearchModule.init();

});