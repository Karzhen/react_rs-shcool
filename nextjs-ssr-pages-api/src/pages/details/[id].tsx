import { useRouter } from 'next/router';
import Details from '../../components/Details/Details';

const DetailsPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    return <Details id={id as string} />;
};

export default DetailsPage;