const SupplierModel = require("../models/Supplier.model")

const getSupplier = async (req, res) => {
    try {
        const result = await SupplierModel.find();

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Supplier", error });
    }
};

const getSupplierByID=async (req,res) => {4
    const {id}=req.params;
    try {
        const result = await SupplierModel.findById(id)

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Supplier", error });
    }
}


const addSupplier=async (req,res) => {
    const data=req.body;
    try {
        const supplier=new SupplierModel(data);
        const result =await supplier.save();
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: "Error Adding Supplier", error });
    }
}

const editSupplier=async (req,res) => {
    const {id}=req.params;
    const data=req.body;
    try {
        const supplier=await SupplierModel.findByIdAndUpdate(id,data);
        return res.status(200).json({ message: "Supplier details updated", supplier });
    } catch (error) {
        res.status(500).json({ message: "Error Updating Supplier", error });
    }
}

const deleteSupplier=async (req,res) => {
    const {id}=req.params;

    try {
        const supplier=await SupplierModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Supplier Deleted", supplier });
    } catch (error) {
        res.status(500).json({ message: "Error In Deleting Supplier", error });
    }
}
module.exports =
{
    getSupplier,
    getSupplierByID,
    addSupplier,
    editSupplier,
    deleteSupplier
}