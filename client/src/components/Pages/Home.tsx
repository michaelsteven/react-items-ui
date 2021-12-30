import React, {ReactElement, FC} from 'react';
import {Page} from '../common';


interface IProps {
}


const Home: FC<IProps> = (): ReactElement<typeof HTMLDivElement> => (
        <Page>
            <div>Welcome to the Demo Application</div>
        </Page>
    )

export default Home;