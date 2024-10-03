import user from "../model/user.js";

export const create = async(req,res)=>{

    try {
        
        const newUser = await user(req.body);
        const email = newUser.email;
        const isPresent = await user.findOne({email});
        if(isPresent) return res.status(200).json({msg:"User Alread present"});
        if(!newUser) {
            return res.status(404).json({
                msg:"not able"
            })
        }

        const savedUser = await newUser.save();
        res.status(200).json({
            msg:"User Created SuccessFully",
            savedUser
        })

    } catch (error) {

        return res.status(500).json({
            msg:"Not able to create the user",
            success:false
        })

    }
}

export const getAll = async(req,res)=>{
    try {
        
        const allUsers = await user.find();

        if(!allUsers) return res.status(404).json({msg:"server error"}) 

        res.status(200).json({
            allUsers
        })

    } catch (error) {
        return res.status(500).json({
            msg:"not able to fetchh the results"
        })
    }
}
export const getOne = async(req,res)=>{
    try {
        const id = req.params.id;
        const userOne =  await user.findById(id);
        return res.status(200).json({
            userOne
        })
    } catch (error) {
        return res.status(500).json({
            msg:"can able to get"
        })
        
    }
}

export const updateOne = async(req,res)=>{
    try {
        const id =  req.params.id;
        const findUser = await user.findById(id);

        if(!findUser) return res.status(404).json({msg:"User not found"});

        const updatedUser = await user.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
            msg:"Updated User Successfully",
            updatedUser
        })
    } catch (error) {
        return res.status(500).json({
            msg:"cannot update the user"
        })
    }
}

export const deleteOne = async(req,res)=>{
    try {
        
        const id = req.params.id;
        const findUser = await user.findById(id);
        
        if(!findUser) return res.status(404).json({
            msg:"user not found"
        })

        const deletedUser = await user.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            deletedUser:deletedUser
        })

    } catch (error) {
        res.status(500).json({
            msg:"not Able to delete"
        })
    }
}