import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";

export const trackCommisionStatus = catchAsyncErrors(
    async (req, res, next) => {
        const user = await User.findById(req.user._id);
        if(user.unpaidCommission > 0){
            return next(
                new ErrorHandler(
                    "You have unpaid commission. Please pay them before posting a new auction.",
                    403
                )
            );
        }
        
        next();
    }
);