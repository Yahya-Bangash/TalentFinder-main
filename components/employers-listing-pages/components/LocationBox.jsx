'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "../../../features/filter/employerFilterSlice";
import { useTranslation } from "@/app/hooks/useTranslation";

const LocationBox = () => {
    const { location } = useSelector((state) => state.employerFilter);
    const [getLocation, setLocation] = useState(location);
    const dispath = useDispatch();
    const { t } = useTranslation('companyListings');

    // location handler
    const locationHandler = (e) => {
        dispath(addLocation(e.target.value));
    };

    useEffect(() => {
        setLocation(location);
    }, [setLocation, location]);

    return (
        <>
            <input
                type="text"
                name="listing-search"
                placeholder={t('locationBox.placeholder')}
                value={getLocation}
                onChange={locationHandler}
            />
            <span className="icon flaticon-map-locator"></span>
        </>
    );
};

export default LocationBox;
