const Account = require('../models/Account')
const bcrypt = require('bcryptjs');


const getAccs = async (req, res) => {
    try {
        const accs = await Account.find({})
        return res.status.json({ accs: accs })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
const getAccById = async (req, res) => {
    const {accId} = req.params
    try {
        const acc = await Account.findById(accId)
        return res.status(200).json({ user: acc })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
const createAcc = async (req, res) => {
    const {name, phone, password, role } = req.body
    try {
        let acc = await Account.findOne({ phone })
        if (acc) {
            return res.status(400).json({ message: 'User already exists!' })
        }

        // ma hoa mat khau 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        acc = new Account({
            name:name,
            phone: phone,
            password: hashedPassword,
            role: role,
        })
        await acc.save()
        return res.status(200).json({acc})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
const updateAcc = async (req, res) => {
    const id = req.params.id
    let { name, phone, password, role } = req.body
    try {

        // ma hoa mat khau 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const updatedAccount = {
            name,
            phone,
            hashedPassword,
            role
        }

        const updatedAcc = await Account.findByIdAndUpdate(id,updatedAccount,{new : true})
        if(!updatedAcc){
        return res.status(404).json({ message: 'Account not found' })
        }
        return res.status(200).json(updatedAcc)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
const deleteAcc  = async (req,res)=>{
    const id = req.params.id
    try {
        const deletedAcc = await Account.findByIdAndDelete(id)
        if(!deletedAcc){
            return res.status(404).json({message: 'Account not found'})
        }
        return res.status(200).json({message: 'Account deleted successfully!'})

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

const checkAuth= async (req,res)=>{
   return  res.status(200).json({user:req.user})
}
const updateAccountField = async (req, res) => {
    const { accId } = req.params; 
    const { field, value } = req.body; 

    // Kiểm tra xem trường 'field' có hợp lệ không
    // const allowedFields = ['location', 'budget', 'partner', 'date', 'vendors']; // Các trường hợp lệ có thể sửa
    // if (!allowedFields.includes(field)) {
    //     return res.status(400).json({ message: 'Invalid field to update' });
    // }

    try {
        const updatedAcc = await Account.findByIdAndUpdate(
            accId,
            { [field]: value }, // Dùng cú pháp computed property để cập nhật trường động
            { new: true } // Trả về bản ghi đã cập nhật
        );

        if (!updatedAcc) {
            return res.status(404).json({ message: 'ACC not found' });
        }

        res.json({ updatedAcc });
    } catch (error) {
        console.error('Error updating plan:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {getAccById,updateAccountField, getAccs, createAcc , updateAcc ,deleteAcc,checkAuth }