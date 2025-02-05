import GymCardList from '@/components/common/GymCardList';
import Pagination from '@/components/common/pagination/Pagination';
import { useOwner } from '@/hooks/useAPI';

const GymListSection = () => {
  const { ownerMyData } = useOwner();

  if (!ownerMyData) return null;

  return (
    <section>
      <GymCardList gymData={ownerMyData.gymList} />
      <Pagination totalPage={5} />
    </section>
  );
};

export default GymListSection;
