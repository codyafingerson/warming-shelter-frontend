import { createStore} from "vuex";
import { userModule} from "./UserModule.js";
import { guestModule } from "./GuestModule.js";
import { bunkModule } from "./BunkModule.js";

const store = createStore({
    modules: {
        userModule,
        guestModule,
        bunkModule
    }
});

export default store;