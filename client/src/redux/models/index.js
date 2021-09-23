import { ORM } from 'redux-orm';

const orm = new ORM({ stateSelector: (state) => state.orm });

orm.register(
    );

export { orm };