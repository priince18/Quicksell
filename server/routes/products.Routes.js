const authMiddlewares = require("../middlewares/authMiddlewares");
const ProductModel = require("../models/products.model");
const router = require("express").Router();
const cloudinary= require("../config/clouldinaryConfig")
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const UserModel = require("../models/user.model");
const notificationModel = require("../models/notification.model");

// add a new products

router.post('/add-products',authMiddlewares,async(req,res)=>{
         try {
            const newProduct = new ProductModel(req.body);
            await newProduct.save();

            // console.log(req.body.userId)
            // get user by id
            const username = await UserModel.findById(req.body.userId);
            // console.log(username.name);
            // send notification to admin
            // 1 get all admins 
            const admins = await UserModel.find({role:'admin'});
            admins.forEach( async(admin) => {
                const newNotification = new notificationModel({
                    user: admin._id,
                    title:"New product added",
                    message:`New Product Added by ${username.name}`,
                    onClick:'/admin',
                    read:false,
                })
                await newNotification.save();
            })
            res.send({
                success:true,
                message:"product add successfully"
            })
            
         } catch (error) {
            res.send({
                success:false,
                message:error.message
            })
         }
})

// get all  products
router.post('/get-products',authMiddlewares,async(req,res)=>{
    try {
        const {seller, category=[], age=[], status, userRole}=req.body;
        let filters={};
        
        // Only allow status filtering for admin users
        if(status && status.trim() !== "" && userRole === 'admin'){
            filters.status=status;
        } else if(userRole !== 'admin') {
            // Non-admin users can only see approved products
            filters.status = "approved";
        }
        
        if(seller){
            filters.seller=seller;
        }

        // filters by category
        if(category.length > 0){
            filters.category={$in: category}
        }

        // filters by age ranges (OR across selected ranges)
        if(Array.isArray(age) && age.length > 0){
            const rangeClauses = age.map((item)=>{
                const fromAge = Number(String(item).split("-")[0]);
                const toAge = Number(String(item).split("-")[1]);
                if(Number.isNaN(fromAge) || Number.isNaN(toAge)){
                    return null;
                }
                return { age: { $gte: fromAge, $lte: toAge } };
            }).filter(Boolean);
            if(rangeClauses.length > 0){
                filters.$or = rangeClauses;
            }
        }
        const products= await ProductModel.find(filters).populate("seller").sort({createdAt:-1});
        res.send({
            success:true,
            data:products,
        })
    } catch (error) {
         res.send({
            success:false,
            message:error.message,
         })

    }
})

// get user's own products (for profile page) - shows all statuses
router.post('/get-user-products',authMiddlewares,async(req,res)=>{
    try {
        const {seller, category=[], age=[], status}=req.body;
        let filters={};
        
        // Users can see all their own products regardless of status
        if(seller){
            filters.seller=seller;
        }
        
        // Allow status filtering for user's own products
        if(status && status.trim() !== ""){
            filters.status=status;
        }

        // filters by category
        if(category.length > 0){
            filters.category={$in: category}
        }

        // filters by age ranges (OR across selected ranges)
        if(Array.isArray(age) && age.length > 0){
            const rangeClauses = age.map((item)=>{
                const fromAge = Number(String(item).split("-")[0]);
                const toAge = Number(String(item).split("-")[1]);
                if(Number.isNaN(fromAge) || Number.isNaN(toAge)){
                    return null;
                }
                return { age: { $gte: fromAge, $lte: toAge } };
            }).filter(Boolean);
            if(rangeClauses.length > 0){
                filters.$or = rangeClauses;
            }
        }
        const products= await ProductModel.find(filters).populate("seller").sort({createdAt:-1});
        res.send({
            success:true,
            data:products,
        })
    } catch (error) {
         res.send({
            success:false,
            message:error.message,
         })

    }
})

// get products by search
router.get('/search/:key',async(req,res)=>{
    try {
         const response=await ProductModel.find({
            '$and': [
                {
                    '$or':[
                        {name:{$regex:req.params.key, $options: 'i'}},
                        {description:{$regex:req.params.key, $options: 'i'}},
                        {category:{$regex:req.params.key, $options: 'i'}}
                    ]
                },
                {status: "approved"}
            ]
         }).populate("seller");
         res.send({
            success:true,
            data:response,
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        })
    }
})



// get-products-by-id

router.get('/get-product-by-id/:id',authMiddlewares,async(req,res)=>{
    try {
        const product  = await ProductModel.findById(req.params.id).populate('seller');
        res.send({
            success: true,
            data:product
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})


// edit product

router.put('/edit-products/:id',authMiddlewares,async(req,res)=>{
    try {
        await ProductModel.findByIdAndUpdate(req.params.id,req.body);
        res.send({
            success:true,
            message: 'Product updated successfully',
        })
    } catch (error) {
        res.send({
            success: true,
            message: error.message,
        })
    }
})

// delete a product by id
router.delete('/delete-products/:id', authMiddlewares , async(req,res)=>{
    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        res.send({
            success: true,
            message: error.message
        })
    }
})


/// get image from pc
const uploadDirectory = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (_req, _file, callback) {
        callback(null, uploadDirectory);
    },
    filename: function (_req, file, callback){
        callback(null, `${Date.now()}-${file.originalname}`);
    }
});


router.post('/upload-product-image',authMiddlewares,multer({storage: storage}).single('file'), async(req,res)=>{
    try {
        if (!req.file) {
            return res.send({
                success: false,
                message: 'No file received. Please select an image to upload.'
            });
        }

        const cloudName = process.env.cloud_name || process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME;
        const apiKey = process.env.cloud_api_key || process.env.CLOUDINARY_API_KEY || process.env.CLOUD_API_KEY;
        const apiSecret = process.env.cloud_api_secret || process.env.CLOUDINARY_API_SECRET || process.env.CLOUD_API_SECRET;

        let imageUrl;

        if (cloudName && apiKey && apiSecret) {
            // upload image to cloudinary if configured
            const result = await cloudinary.uploader.upload(req.file.path,{
                folder:'sheymp',
            });
            imageUrl = result.secure_url;
        } else {
            // use local file storage for development
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
        }
        
        const productId = req.body.productId;
        await ProductModel.findByIdAndUpdate(productId,{
            $push:{images:imageUrl},
        });
        res.send({
            success:true,
            message:'Image uploaded successfully',
            data:imageUrl,
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        })
    }
})



// update products status by admin

router.put('/update-product-status/:id',authMiddlewares,async(req,res)=>{
    try {
        const {status} = req.body;
       const updatedProduct= await ProductModel.findByIdAndUpdate(req.params.id,{status});

        // send notification to seeller after admin acceepts the product
        const notification  = new notificationModel({
            user:updatedProduct.seller,
            title:'product status updated',
            message:`your product ${updatedProduct.name} has been ${status}`,
            onClick:'/profile',
            read:false,
        })
        await notification.save()
        res.send({
            success:true,
            message:"products status updated successfully"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        })
    }
})


module.exports = router

