var model = {
    students: [        
        {
            name: 'Slappy the Frog',
            checkboxes: [1,1,1,1,0,0,1,0,1,1,1,0],
            total: 0
        },
        {
            name: 'Lilly the Lizard',
            checkboxes: [1,0,1,1,0,0,0,1,1,0,0,0],
            total: 0
        },
        {
            name: 'Paulrus the Walrus',
            checkboxes: [0,1,0,0,0,1,1,1,0,0,0,1],
            total: 0
        }
    ]
}

var octopus = {
    init: function(){
        this.getAllTotals();
        tableView.render();
    },
    getAllTotals: function(){
        model.students = model.students.map(s => {
            s.total = this.getTotal(s.checkboxes);
            return s;
        });
    },
    getTotal: function(array){
        return array.reduce(function(total, num){
            if(num==0){
                total++;
            }
            return total;
        }, 0);
    },
    getStudents: function(){
        return model.students;
    },
    selectCheckBox: function(name, index, ei){
        model.students = model.students.map(s => {
            if(s.name === name){console.log(name);
                s.checkboxes[index] = (s.checkboxes[index]==0)? 1:0;
                s.total = this.getTotal(s.checkboxes);
                var total = $(`.total-${ei}`);
                tableView.updateTotal(total, s.total);
            }
            return s;
        });
    }
}

var tableView = {
    init: function(){
        this.tableBody = $('.tableBody');
    },
    render: function(){
        this.init();
        octopus.getStudents().forEach((element, ei) => {
            var tr = this.tableBody.append('<tr class="student">');
            tr.append(`<td class="name-col">${element.name}</td>`);
            element.checkboxes.forEach((c, i) => {
                var td = tr.append(`<td class="attend-col"><input type="checkbox" ${(c==1)? 'checked':''} id="${ei}-${i}"></td>`);
                console.log(td.find('input'));
                td.find(`input#${ei}-${i}`).on('change',function ()
                {
                    octopus.selectCheckBox(element.name, i, ei);
                }
                );
            });
            tr.append(`<td class="missed-col total-${ei}">${element.total}</td>`);
        }); 
    },
    updateTotal: function(elem, total){
        elem.html(total);
    }
}
octopus.init();
