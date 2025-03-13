import { useTranslation } from "@/app/hooks/useTranslation";

const PopularSearch = () => {
  const { t } = useTranslation('home');
  const popularKeywords = t('hero3.popular_searches.keywords');

  return (
    <div className="popular-searches" data-aos="fade-up" data-aos-delay="1000">
      <span className="title">{t('hero3.popular_searches.title')} : </span>
      {popularKeywords && Array.isArray(popularKeywords) ? (
        popularKeywords.map((keyword, index) => (
          <span key={index}>
            <a href="#">{keyword}</a>
            {index < popularKeywords.length - 1 ? ', ' : ''}
          </span>
        ))
      ) : (
        <>
          <a href="#">Designer</a>, <a href="#">Developer</a>, <a href="#">Web</a>,
          <a href="#"> IOS</a>, <a href="#">PHP</a>, <a href="#">Senior</a>,
          <a href="#"> Engineer</a>
        </>
      )}
    </div>
  );
};

export default PopularSearch;
