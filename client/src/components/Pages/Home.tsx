import React, {ReactElement, FC} from 'react';


interface IProps {
}


const Home: FC<IProps> = (): ReactElement<typeof HTMLDivElement> => (
        <div>Welcome to the Demo Application</div>
    )

export default Home;