angular.module('app').controller('ngLoansContoller', ngLoansContoller);

function ngLoansContoller() {
    var vm = this;

    vm.title = 'Loans Controller';
    vm.customers = [];
    vm.loans = [];

    GetCustomers();

    function GetCustomers() {
        vm.title = "Grant Loan";
        if (localStorage.getItem('customers'))
            vm.customers = JSON.parse(localStorage.getItem('customers'));

        GetLoans();
    }

    function GetLoans() {
        vm.TotalAmountOwed = parseFloat("0.0");

        if (localStorage.getItem('loans'))
            vm.loans = JSON.parse(localStorage.getItem('loans'));

        for (let index = 0; index < vm.loans.length; index++) {
            const element = vm.loans[index];

            vm.TotalAmountOwed = vm.TotalAmountOwed + parseFloat(element.Amount);

        }
    }

    vm.Save = function() {
        if (localStorage.getItem('loans'))
            vm.loans = JSON.parse(localStorage.getItem('loans'));

        if (vm.loans)
            vm.loan.Id = vm.loans.length + 1;
        else
            vm.loan.Id = 1;

        vm.loan.Customer = vm.loan.Customer.Names;
        vm.loans.push(vm.loan);

        localStorage.setItem('loans', JSON.stringify(vm.loans));

        Clear();

        swal("Success", "Customer Granted Loan", "success");

        GetLoans();
    }

    function Clear() {
        vm.add = false;
        vm.edit = false;

        vm.loan = {
            Id: "",
            Customer: "",
            Amount: "",
            Interest: "",
            Period: ""
        }
    }
}