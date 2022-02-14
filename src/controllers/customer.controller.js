const Customer = require("../schemas/Customer")


const getCustomers = async (req, res) => {
    try {
        
        const customer = await Customer.find()

        return res.status(200).json({
            ok: true,
            message: "",
            customer,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Error con el servidor"
        })
    }
}

const createCustomer = async (req, res) =>{
    try {
        //console.log(req.body);   
        const {name, email, company, phone} = req.body

        const newCustomer = new Customer({name, email, company, phone})

        const customerSaved = await newCustomer.save()

        return res.status(202).json({
            ok: true,
            message: "Cliente creado con éxito",
            customer: customerSaved
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Error con el servidor"
        })
    }
}

const updateCustomer = async (req, res) => {
    try {  
        const {id, name, email, company, phone} = req.body

        const userExist = await Customer.exists({_id: id})

        if (!userExist) return res.status(404).json({
            ok: false,
            message: "No existe el cliente"
        })

        const customerUpdate = await Customer.findByIdAndUpdate(
            id, {
                $set: { name, email, company, phone},
        }, {new: true})

        return res.status(200).json({
            ok: true,
            message: "Cliente actualizado con éxito",
            customer: null
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Error con el servidor"
        })
    }
}

const deleteCustomer = async (req, res) => {
    try {  
        const { id } = req.body

        const userExist = await Customer.exists({_id: id})

        if (!userExist) return res.status(500).json({
            ok: false,
            message: "No existe el cliente"
        })

        const customerDeleted = await Customer.deleteOne({ _id: id})

        return res.status(404).json({
            ok: true,
            message: "Cliente eliminado con éxito",
            customer: {_id: id, ...customerDeleted}
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Error con el servidor"
        })
    }
}

module.exports = {getCustomers, createCustomer, updateCustomer, deleteCustomer}