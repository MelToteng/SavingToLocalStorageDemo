angular.module('app').controller('ngCustomerContoller', ngCustomerContoller);

function ngCustomerContoller() {
    var vm = this;

    vm.title = 'Customer Controller';
    vm.customers = [];

    vm.add = false;
    vm.edit = false;

    GetCustomers();

    function GetCustomers() {
        if (localStorage.getItem('customers'))
            vm.customers = JSON.parse(localStorage.getItem('customers'));
    }

    vm.Cancel = function() {
        Clear();
    }

    function Clear() {
        vm.add = false;
        vm.edit = false;

        vm.customer = {
            Id: "",
            Names: "",
            ContactInfo: ""
        }
    }
    vm.Add = function() {

        vm.add = true;

        vm.title = 'Add New Customer';
    }


    vm.Save = function() {

        if (vm.title == 'Add New Customer')
            SaveNewCustomer();
        else
            SaveCustomerUpdate();

        Clear();
    }

    function SaveNewCustomer() {

        if (localStorage.getItem('customers'))
            vm.customers = JSON.parse(localStorage.getItem('customers'));

        vm.customers.push(vm.customer);

        localStorage.setItem('customers', JSON.stringify(vm.customers));

        vm.edit = false;

        vm.add = false;

        swal("Success", "Customer Info Saved", "success");
    }

    function SaveCustomerUpdate() {

        var index = FindCustomerIndex(vm.customer.Id);

        vm.customers.splice(index, 1);

        vm.customers.push(vm.customer);

        vm.edit = false;
        vm.add = false;

        localStorage.setItem('customers', JSON.stringify(vm.customers));
    }

    function FindCustomer(id) {

        for (let index = 0; index < vm.customers.length; index++) {
            const element = vm.customers[index];

            if (element.Id == id)
                return element;
        }
    }

    function FindCustomerIndex(id) {
        for (let index = 0; index < vm.customers.length; index++) {
            const element = vm.customers[index];

            if (element.Id == id)
                return index;

        }
    }

    vm.Edit = function(id) {

        vm.customer = FindCustomer(id);

        vm.add = true;

        vm.edit = true;

        vm.title = "Update Customer Info";
    }

    vm.Delete = function(id) {

        var index = FindCustomerIndex(id);

        vm.customers.splice(index, 1);

        localStorage.setItem('customers', JSON.stringify(vm.customers));

        swal("Success", "Customer Deleted", "success");

        Clear();

    }


}