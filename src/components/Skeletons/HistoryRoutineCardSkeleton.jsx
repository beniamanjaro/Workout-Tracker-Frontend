import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const HistoryRoutineCardSkeleton = () => {
  return (
    <div className="w-full md:max-w-[50vw]">
      <SkeletonTheme baseColor="#FFFFFF" highlightColor="#e3e3e3">
        <p>
          <Skeleton height="90px" width="100%" />
        </p>
      </SkeletonTheme>
    </div>
  );
};

export default HistoryRoutineCardSkeleton;
