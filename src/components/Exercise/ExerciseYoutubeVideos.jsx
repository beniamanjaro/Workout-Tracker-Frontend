const ExerciseYoutubeVideos = ({ exerciseYoutubeVideos, name }) => {
  return (
    <div>
      <h3 className="text-3xl m-12">
        Watch{" "}
        <span className="text-black underline decoration-pink-500 capitalize">
          {name}
        </span>{" "}
        exercises videos
      </h3>
      <div className="gap-4 columns-2 lg:columns-3 xl:columns-6 m-2">
        {exerciseYoutubeVideos?.map((video, index) => (
          <div className="p-2">
            <a
              key={index}
              className=""
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="border-2 border-white border-t-2 border-t-red-500"
                src={`${video.snippet.thumbnails.high.url}`}
                alt="youtube exercise"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseYoutubeVideos;
