class PhysicsEngine {
    constructor({gravity}) {
        this._gravity = gravity
    }

    update(entity) {
        if(entity.falling) {
            entity.speed += this._gravity
            entity.y += entity.speed
        }
        
    }
}