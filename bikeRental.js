const fs = require("fs");
const input = require("readline-sync");

class Admin_Accounts{
    
    intro(){
        let opt = input.questionInt(`Welcome to Accounts:: \n1.Sign up\n2.Log in\n3.Exit\n`);
        if(opt == 3){
            console.log(`------ Exited----\n`);
            return 0
        }
        else if(opt == 1){
            admin_accounts.signup()
            return 1
        }
        else if(opt == 2){
            return 2
        }
        else{
            console.log(`------ Invalid request`);
            accounts.intro()
        }
}

    signup(admin_email,admin_info){
        if(!fs.existsSync("./hackathon/store_admin_data.json")){
            let admin_data = {}
            let arr = []
            admin_data[admin_email] = admin_info
            arr.push(admin_data)
            fs.writeFileSync("./hackathon/store_admin_data.json",JSON.stringify(arr,null,4))
            return true
        }
        else{
            let arr = JSON.parse(fs.readFileSync("./hackathon/store_admin_data.json"))
            let obj = arr[0]
            if(!obj.hasOwnProperty(admin_email)){
                obj[admin_email] = admin_info
                let arr1 = []
                arr1.push(obj)
                fs.writeFileSync("./hackathon/store_admin_data.json",JSON.stringify(arr1,null,4))
                return true
            }
            else{
                console.log(`------You have already an account with this Email: `);
                return false
            }
        }
    }

    login(admin_email,admin_pass){
        if(!fs.existsSync("./hackathon/store_admin_data.json")){
            console.log(`----- Your account does not exists: `);
            return false
        }
        else{
            let arr = JSON.parse(fs.readFileSync("./hackathon/store_admin_data.json"))
            let obj = arr[0]
            if(obj.hasOwnProperty(admin_email)){
                if(admin_pass == obj[admin_email]["Admin_pass"]){
                    return true
                }
                else{
                    console.log(`------ Wrong password`);
                    return false
                }
            }
            else{
                console.log(`------ There is no account with this Email: `);
                return false
            }
        }
    }
}

class Customer_Accounts{

    intro(){
        let opt = input.questionInt(`Welcome to Accounts:: \n1.Sign up\n2.Log in\n3.Exit\n`);
        if(opt == 3){
            console.log(`------ Exited----\n`);
            return 0
        }
        else if(opt == 1){
            customer_accounts.signup()
            return 1
        }
        else if(opt == 2){
            return 2
        }
        else{
            console.log(`------ Invalid request`);
            customer_accounts.intro()
        }
}

    signup(admin_email,admin_info){
        if(!fs.existsSync("./hackathon/store_customer_data.json")){
            let admin_data = {}
            let arr = []
            admin_data[admin_email] = admin_info
            arr.push(admin_data)
            fs.writeFileSync("./hackathon/store_customer_data.json",JSON.stringify(arr,null,4))
            return true
        }
        else{
            let arr = JSON.parse(fs.readFileSync("./hackathon/store_customer_data.json"))
            let obj = arr[0]
            if(!obj.hasOwnProperty(admin_email)){
                obj[admin_email] = admin_info
                let arr1 = []
                arr1.push(obj)
                fs.writeFileSync("./hackathon/store_customer_data.json",JSON.stringify(arr1,null,4))
                return true
            }
            else{
                console.log(`------You have already an account with this Email: `);
                return false
            }
        }
    }

    login(admin_email,admin_pass){
        let num = admin_email.toString()
        if(!fs.existsSync("./hackathon/store_customer_data.json")){
            console.log(`----- Your account does not exists: `);
            return false
        }
        else{
            let arr = JSON.parse(fs.readFileSync("./hackathon/store_customer_data.json"))
            let obj = arr[0]
            if(obj.hasOwnProperty(num)){
                if(admin_pass == obj[num]["customer_pass"]){
                    return true
                }
                else{
                    console.log(`------ Wrong password`);
                    return false
                }
            }
            else{
                console.log(`------ There is no account with this Email: `);
                return false
            }
        }
    }
}

class Customer_Bike_Store{
    constructor(bike_obj){
        this.bike_obj = bike_obj
        let bike_arr = []
        for(let bike in this.bike_obj){
            bike_arr.push(bike)
        }
        this.bike_arr = bike_arr
    }
    
    showbike(){
        let bike_arr1 = JSON.parse(fs.readFileSync("./hackathon/Bike_Stock.json"))
        let bike_obj1 = bike_arr1[0]
        let ser = 0
        console.log(`------ Bikes in Our Store:------\n`);
        for(let bike in bike_obj1){
            ser++
            console.log(`-----${ser}. ${bike}-----${bike_obj1[bike][0]} per Hour----LEFT IN STOCK_(${bike_obj1[bike][1]})-----`);
        }
        console.log('\n');
        return ser
    }
    Bikecost(bike_rent){
        let cost = 0
        for(let bike of bike_rent){
            cost+=this.bike_obj[bike][0]
        }
        return cost
    }

    return(num,customer_pass){
        let customer_contact_no = num.toString()
        let customer_data_arr = JSON.parse(fs.readFileSync("./hackathon/store_customer_data.json"))
        let obj = customer_data_arr[0]
        if(!obj.hasOwnProperty(customer_contact_no)){
            console.log(`------ You have not taken any bikes on rent: Bye: `);
            return false
        }
        else{
            customer_pass = customer_pass.toString()
            if(customer_pass == obj[num]["customer_pass"]){
                if(obj[customer_contact_no].hasOwnProperty('rent')){
                    let rent = obj[customer_contact_no]['rent']
                    let total_cost = 0
                    var bikes_ids = obj[customer_contact_no]['rented_bikes']
                    // var temp_arr = bikes_ids['bikes']
                    for(let bike in bikes_ids){
                        console.log(`------ You have taken these bikes ${obj[customer_contact_no]['rented_bikes'][bike]} at this time ${bike}`);
                        let reurn_time = new Date()/1000
                        let rent_time = Number(bike)
                        let final_time = reurn_time - rent_time
                        function secondsToHms(d){
                            d = Number(d);
                            var h = Math.floor(d / 3600);
                            var m = Math.floor((d % 3600) / 60);
                          
                            var hDis = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
                            var mDis = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
                          
                            return [hDis,mDis]
                          }
                        let [h,m] = secondsToHms(final_time)
                        h = h.split(' ')
                        m = m.split(' ')
                        h = h[0]
                        m = m[0]
                        let prize = Number(h) * rent + (Number(m) >= 30)? rent / 2: 50;
                        total_cost+=prize
                    }
                    console.log(`------ Your total cost of rent is ${total_cost} for all Bikes:\n------ Do you want to return bikes:\n------ 1.Yes\n------ 2.No\n `);
                    var opt = input.questionInt(`------Enter your option: \n`)
                }
                else{
                    console.log(`------ You have not taken any bikes on rent: Bye: `);
                    return false
                }
                if(opt == 2){
                    console.log(`------ Ok, no problem. Return some other Day.`);
                }
                else if(opt == 1){
                    let bike_stock_arr = JSON.parse(fs.readFileSync("./hackathon/Bike_Stock.json"))
                    let bike_stock_obj = bike_stock_arr[0]
                    for(let id in bikes_ids){
                        for(let bike of obj[customer_contact_no]['rented_bikes'][id]){
                            bike_stock_obj[bike][1] = bike_stock_obj[bike][1] + 1
                        }
                    }
                    let arr1 = []
                    arr1.push(bike_stock_obj)
                    fs.writeFileSync("./hackathon/Bike_Stock.json",JSON.stringify(arr1,null,4))
                    delete obj[customer_contact_no]
                    let arr2 = []
                    arr2.push(obj)
                    fs.writeFileSync("./hackathon/store_customer_data.json",JSON.stringify(arr2,null,4))
                    return true
                }
                else{
                    console.log(`------ Invalid request: `);
                    return false
                }
            }
            else{
                console.log(`----- Wrong password: `);
                return false
            }
            
        }

    }

    rent(customer_contact_no,customer_info_dict,rent_time){
        if(!fs.existsSync("./hackathon/store_customer_data.json")){
            let customer_arr = []
            let customer_data = {}
            customer_data[customer_contact_no] = customer_info_dict
            customer_arr.push(customer_data)
            fs.writeFileSync("./hackathon/store_customer_data.json",JSON.stringify(customer_arr,null,4))
        }
        else{
            let customer_arr = JSON.parse(fs.readFileSync("./hackathon/store_customer_data.json"))
            let obj1 = customer_arr[0]
            let num = customer_contact_no.toString()
            if(!obj1.hasOwnProperty(num)){
                obj1[customer_contact_no] = customer_info_dict
            }
            else{
                if(obj1[num].hasOwnProperty('rent')){
                    let arr = customer_info_dict['rented_bikes']['bikes'][rent_time]
                    obj1[num]['rented_bikes'][rent_time] = arr
                    obj1[num]['rent'] = obj1[num]['rent'] + customer_info_dict['rent']
                }
                else{
                    let bike_dict = {}
                    bike_dict[rent_time] = customer_info_dict['rented_bikes']['bikes'][rent_time]
                    obj1[num]['rent'] = customer_info_dict['rent']
                    obj1[num]['rented_bikes'] = bike_dict
                }

            }
            let arr = []
            arr.push(obj1)
            fs.writeFileSync("./hackathon/store_customer_data.json",JSON.stringify(arr,null,4))
        }
        let bike_arr = JSON.parse(fs.readFileSync("./hackathon/Bike_Stock.json"))
        let obj = bike_arr[0]
        let u_bikes = customer_info_dict["rented_bikes"]['bikes'][rent_time]
        for(let bike of u_bikes){
            obj[bike][1] = obj[bike][1]-1
        }
        let arr = [obj]
        fs.writeFileSync("./hackathon/Bike_Stock.json",JSON.stringify(arr,null,4))
    }

    chooseBike(){
        let bikes = []
        let total_bikes = 0
        let cost = 0
        while(true){
            let bike_arrtemp = JSON.parse(fs.readFileSync("./hackathon/Bike_Stock.json"))
            let bike_dicttemp = bike_arrtemp[0]
            let opt = input.questionInt(`------ Want to Rent or No\n\n    1.Rent\n    2.Enough\n    3.Don't wanna rent\n`)
            if(opt == 3){
                console.log(`------ No problem: thank you for visiting: `);
                return 0
            }
            else if (opt == 2) {
                console.log(`------ Thank you, Have a nice Day:`)
                console.log(`------ Totally you will be charged ${cost} per Hour for all bikes: `);
                let bikes_info = [bikes,total_bikes]
                return bikes_info
            }
            else if (opt == 1){
                let bike_qty = store1.showbike()
                let user_choice = input.questionInt(`------ Enter the seriel number of that bike you want:------\n`)
                if(user_choice>bike_qty || user_choice<1){
                    console.log("------ sorry, your request is Invalid:------");
                    return 0
                }
                else{
                    let bike_key = this.bike_arr[user_choice-1]
                    console.log(`------ You will be charged ${this.bike_obj[bike_key][0]} per Hour for this Bike: `);
                    let bike_count = input.questionInt(`------ How many ${bike_key} you want to Rent:------\n`)
                    if(bike_count>bike_dicttemp[bike_key][1]){
                        console.log(`------ Sorry, ${bike_key} are only ${bike_dicttemp[bike_key][1]} left in our stock`);
                        return 0
                    }
                    else if(bike_count<=0){
                        console.log(`------ Invalid request: `);
                        return 0
                    }
                    for(let i =0;i<bike_count;i++){
                        bikes.push(bike_key)
                        cost+=this.bike_obj[bike_key][0]
                    }
                    total_bikes+=bike_count
                }
            }
            else{
                console.log(`------ Invalid request: `);
            }
        }
    }
}

class Admin_Bike_Store{
    constructor(bike_obj){
        this.bike_obj = bike_obj
        let bike_list = []
        for(let bike in this.bike_obj){
            bike_list.push(bike)
        }
    }
    deleteStock(data_to_delete){
        let bike_arr = JSON.parse(fs.readFileSync("./hackathon/Bike_Stock.json"))
        let bike_obj = bike_arr[0]
        for(let bike of data_to_delete){
            delete bike_obj[bike]
        }
        let list = []
        list.push(bike_obj)
        fs.writeFileSync("./hackathon/Bike_Stock.json",JSON.stringify(list,null,4))
    }
    addStock(data_to_add){
        if(!fs.existsSync("./hackathon/Bike_Stock.json")){
            let arr = []
            arr.push(data_to_add)
            fs.writeFileSync("./hackathon/Bike_Stock.json",JSON.stringify(arr,null,4))
        }
        else{
            let bike_arr = JSON.parse(fs.readFileSync("./hackathon/Bike_Stock.json"))
            let bike_obj = bike_arr[0]
            for(let bike in data_to_add){
                if(!bike_obj.hasOwnProperty(bike)){
                    bike_obj[bike] = data_to_add[bike]
                }
                else{
                    bike_obj[bike][1] = bike_obj[bike][1]+data_to_add[bike][1]
                }
            }
            let arr = []
            arr.push(bike_obj)
            fs.writeFileSync("./hackathon/Bike_Stock.json",JSON.stringify(arr,null,4))
        }
    }

    showbike(){
        let bike_arr = JSON.parse(fs.readFileSync("./hackathon/Bike_Stock.json"))
        let bike_obj = bike_arr[0]
        let ser = 0
        console.log(`------ Bikes in Our Store:------\n`);
        for(let bike in bike_obj){
            ser++
            console.log(`-----${ser}. ${bike}-----${bike_obj[bike][0]} per Hour----LEFT IN STOCK_(${bike_obj[bike][1]})-----`);
        }
        console.log('\n');
        return ser
    }
}

// ------------------ BODY-------------------//

let admin_accounts = new Admin_Accounts()
let customer_accounts = new Customer_Accounts()

function start(){
    let person = input.questionInt(`------ Who are you? \n------1.Admin\n------2.Customer\n`)
    if(person == 1){
        let ask = admin_accounts.intro()
        if(ask == 1){
            let [admin_email,admin_info] = Admin_signinData()
            let bool = admin_accounts.signup(admin_email,admin_info)
            if(bool){
                console.log(`------ Account Created Successfully: now you are a admin: `);
                Admin_func()
            }
            else{
                start()
            }
        }
        else if(ask == 2){
            let admin_email = input.questionEMail(`------ Enter your Email: `)
            let admin_pass = input.question(`------ Enter your password: `)
            let val = admin_accounts.login(admin_email,admin_pass)
            if(val){
                Admin_func()
            }
            else{
                start()
            }
        }
    }
    else if(person == 2){
        let ask = customer_accounts.intro()
        if(ask == 1){
            let [customer_contact_no,customer_info] = Customer_signinData()
            let bool = customer_accounts.signup(customer_contact_no,customer_info)
            if(bool){
                console.log(`------ Account Created Successfully: now you are a customer: `);
                Customer_func(customer_contact_no,customer_info)
            }
            else{
                start()
            }
        }
        else if(ask == 2){
            let customer_contact_no = input.questionInt(`------ Enter your contact number: `)
            let customer_pass = input.question(`------ Enter your password: `)
            let val = customer_accounts.login(customer_contact_no,customer_pass)
            if(val){
                let arr = JSON.parse(fs.readFileSync("./hackathon/store_customer_data.json"))
                let obj = arr[0]
                let num = customer_contact_no.toString()
                customer_info = obj[num]
                Customer_func(customer_contact_no,customer_info)
            }
            else{
                start()
            }
        }
    }
}

function Admin_signinData(){
    let admin_name = input.question(`------ Enter your name: `)
    let admin_email = input.questionEMail(`------ Enter your Email: `)
    let admin_pass = input.question(`------ Enter your password: `)
    let admin_info = {}
    admin_info["Admin_name"] = admin_name
    admin_info["Admin_pass"] = admin_pass
    return [admin_email,admin_info]
}

function Customer_signinData(){
    let customer_name = input.question(`------ Enter your name: `)
    let customer_contact_no = input.questionInt(`------ Enter your contact no: `)
    let customer_pass = input.question(`------ Enter your password: `)
    let customer_age = input.questionInt(`------ Enter your age: `)
    let customer_info = {}
    customer_info["customer_name"] = customer_name
    customer_info["customer_pass"] = customer_pass
    customer_info["customer_age"] = customer_age
    return [customer_contact_no,customer_info]
}

function Customer_func(customer_contact_no,customer_info_dict){
    if(!fs.existsSync('./hackathon/Bike_Stock.json')){
        let Bike_Stock_arr = [{'Royal Enfield Classic 350':[500,5],'Yamaha R15S':[400,5],'TVS Apache RTR 160':[300,5],'TVS Raider':[200,5],'KTM 390 Duke':[100,5]}]
        fs.writeFileSync('./hackathon/Bike_Stock.json',JSON.stringify(Bike_Stock_arr,null,4))
    }
    let Bike_Stock_arr = JSON.parse(fs.readFileSync("./hackathon/Bike_Stock.json"))
    let Bike_Stock_obj = Bike_Stock_arr[0]
    let bike_list = []
    for(let bike in Bike_Stock_obj){
        bike_list.push(bike)
    }
    var store1 = new Customer_Bike_Store(Bike_Stock_obj)
    console.log('WELCOME TO Our Bike Rental Store: \n');
    while(true){
        user_action = input.questionInt(`------ WHAT YOU WANT TO DO ------\n\n------ 1. RENT FROM US: \n------ 2. RETURN TO US: \n------ 3. EXIT: \n\n`)
        if(user_action === 3){
            console.log(`------ THANK YOU FOR VISITING OUR STORE. \n------ HAVE A NICE DAY -----\n`);
            break
        }
        else if(user_action == 1){
            let user_bikes = store1.chooseBike()
            if(!user_bikes==0){
                let bike_rent = user_bikes[0]
                let bike_cost = store1.Bikecost(bike_rent)
                let confirm = input.questionInt(`------ Do you want to Rent these bikes ${user_bikes}.\n------ 1.Yes\n------2.No\n`)
                if(confirm == 2){
                    console.log(`------ Thank you. No problem. Come again`);
                }
                else if(confirm == 1){
                    let rent_time = new Date()/1000
                    let rented_bikes = {}
                    let bike_d = {}
                    bike_d[rent_time] = bike_rent
                    rented_bikes['bikes'] = bike_d
                    customer_info_dict['rent'] = bike_cost
                    customer_info_dict['rented_bikes'] = rented_bikes
                    let customer_data = {}
                    customer_data[customer_contact_no] = customer_info_dict
                    store1.rent(customer_contact_no,customer_info_dict,rent_time)
                }
                else{
                    console.log(`------ Invalid request: `);
                }
            }
        }
        else if(user_action == 2){
            let customer_contact_no = input.questionInt(`------ Enter your contact Number: `)
            let customer_pass = input.question(`------ Enter your password: `)
            let n = store1.return(customer_contact_no,customer_pass)
            if(!n){
                console.log(`------ Thank for Visiting: `);
            }
            else{
                console.log(`------ Thank you for Returning. Come again: And Have a Nice day: `);
            }
        }
        
    }
}

function Admin_func(){
    if(!fs.existsSync('./hackathon/Bike_Stock.json')){
        let opt = input.questionInt(`------ What do you want to work with?\n------1.Default data\n------2.Create my own data\n`)
        if(opt == 1){
            let Bike_Stock_arr = [{'Royal Enfield Classic 350':[500,5],'Yamaha R15S':[400,5],'TVS Apache RTR 160':[300,5],'TVS Raider':[200,5],'KTM 390 Duke':[100,5]}]
            fs.writeFileSync('./hackathon/Bike_Stock.json',JSON.stringify(Bike_Stock_arr,null,4))
        }
        else if(opt == 2){
            addData()
        }
        else{
            console.log(`------ Invalid request: `);
        }
        
    }
    let Bike_Stock_arr = JSON.parse(fs.readFileSync("./hackathon/Bike_Stock.json"))
    let Bike_Stock_obj = Bike_Stock_arr[0]
    let bike_list = []
    for(let bike in Bike_Stock_obj){
        bike_list.push(bike)
    }
    var store = new Admin_Bike_Store(Bike_Stock_obj)
    console.log('WELCOME TO Your Bike Rental Store: \n');
    while(true){
        let admin_choice = input.questionInt(`------ What you want to do?\n------1.See Stock\n------2.Add Stock\n------3.Delete Stock\n------4.Exit\n`)
        if(admin_choice == 1){
            store.showbike()
        }
        else if(admin_choice == 2){
            addData()
        }
        else if(admin_choice == 3){
            deleteData(bike_list)
        }
        else if(admin_choice == 4){
            console.log(`------ Bye----`);
            break
        }
        else{
            console.log(`------ Invalid request: `);
        }
    }
}

class storeInherit extends Admin_Bike_Store{
    add(data_to_add){
        super.addStock(data_to_add)
    }
    del(data_to_delete){
        super.deleteStock(data_to_delete)
    }
    show(){
        super.showbike()
    }
}
let store1 = new storeInherit()

function addData(){
    let data_to_add = {}
    let c = 0
    while(true){
        if(c<1){
            let opt = input.questionInt(`------ 1.Add\n------ 2.Don't Add\n`)
            if(opt == 2){
                console.log(`------ Ok no data added to stock: `);
                break
            }
            else if(opt == 1){
                let bike_name = input.question(`------ Enter Bike name:\n`)
                let bike_prize = input.questionInt(`------ Enter Bike rent for ${bike_name} you want to charge per hour:\n`)
                let bike_qty = input.questionInt(`------ Enter quantity of ${bike_name} you want to Add:\n`)
                data_to_add[bike_name] = [bike_prize,bike_qty]             
                c++
            }
            else{
                console.log(`------ Invalid request: `);
            }
        }
        else{
            let opt = input.questionInt(`------ 1.Add\n------ 2.Enough\n------ 3.Don't Add\n`)
            if(opt == 3){
                console.log(`------ Ok no data added to stock: `);
                break
            }
            else if(opt == 2){
                store1.add(data_to_add)
                break
            }
            else if(opt == 1){
                let bike_name = input.question(`------ Enter Bike name:\n`)
                let bike_prize = input.questionInt(`------ Enter Bike rent for ${bike_name} you want to charge per hour:\n`)
                let bike_qty = input.questionInt(`------ Enter quantity of ${bike_name} you want to Add:\n`)
                data_to_add[bike_name] = [bike_prize,bike_qty]             
                c++
            }
            else{
                console.log(`------ Invalid request: `);
            }
        }

    }
}

function deleteData(bike_list){
    let data_to_delete = []
    let c = 0
    while(true){
        if(c<1){
            let opt = input.questionInt(`------ 1.Delete\n------ 2.Don't Delete\n`)
            if(opt == 2){
                console.log(`------ Ok no data deleted from stock: `);
                break
            }
            else if(opt == 1){
                store1.show()
                let bike_index = input.question(`------ Enter seriel number of that bike which you want to remove from stock:\n`)
                let bike_key = bike_list[bike_index-1]
                data_to_delete.push(bike_key)           
                c++
            }
            else{
                console.log(`------ Invalid request: `);
            }
        }
        else{
            let opt = input.questionInt(`------ 1.Delete\n------ 2.Enough\n------ 3.Don't Delete\n`)
            if(opt == 3){
                console.log(`------ Ok no data deleted from stock: `);
                break
            }
            else if(opt == 2){
                store1.del(data_to_delete)
                break
            }
            else if(opt == 1){
                store1.show()
                let bike_index = input.question(`------ Enter seriel number of that bike which you want to remove from stock:\n`)
                let bike_key = bike_list[bike_index-1]
                data_to_delete.push(bike_key)           
                c++
            }
            else{
                console.log(`------ Invalid request: `);
            }
        }

    }
}

start()