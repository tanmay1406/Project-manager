export const UserRolesEnum={
    ADMIN:"admin",
    PROJECT_ADMIN:"project_admin",
    MEMBER:"member"
}//yahan pe toh hum pura ek object bhej rahee hain 

export const AvailableUserRole = Object.values(UserRolesEnum)//this returns the value in a array form 


export const TaskStatusEnum={
    TODO:"todo",
    IN_PROGRESS:"in_progress",
    DONE:"done"
}

export const AvailableTaskStatus=Object.values(TaskStatusEnum)