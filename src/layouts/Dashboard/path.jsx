import {
    CrownFilled,
    TabletFilled
} from '@ant-design/icons';
import { LayoutDashboard } from 'lucide-react';

export default {
    route: {
        routes: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                icon: <LayoutDashboard />,
            },
            {
                path: '/quiz',
                name: 'Quiz',
                icon: <CrownFilled />,
                routes: [
                    {
                        path: '/quiz/quiz',
                        name: 'Quiz',
                        icon: <CrownFilled />,
                    },
                ],
            }

        ],
    },
    location: {
        pathname: '/',
    },

};