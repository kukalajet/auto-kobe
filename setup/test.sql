SELECT "listing"."id"              AS "listing_id",
       "listing"."registration"    AS "listing_registration",
       "listing"."price"           AS "listing_price",
       "listing"."mileage"         AS "listing_mileage",
       "listing"."cubiccapacity"   AS "listing_cubicCapacity",
       "listing"."power"           AS "listing_power",
       "listing"."status"          AS "listing_status",
       "listing"."modelid"         AS "listing_modelId",
       "listing"."conditionid"     AS "listing_conditionId",
       "listing"."valuteid"        AS "listing_valuteId",
       "listing"."transmissionid"  AS "listing_transmissionId",
       "listing"."countryid"       AS "listing_countryId",
       "listing"."doorsid"         AS "listing_doorsId",
       "listing"."fuelid"          AS "listing_fuelId",
       "listing"."emissionclassid" AS "listing_emissionClassId",
       "listing"."userid"          AS "listing_userId"
FROM   "listing" "listing"
WHERE  listing.userid = $1 