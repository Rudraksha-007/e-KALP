"""
Semantic category definitions for citizen-reported problems.

Each category contains multiple natural-language examples.
The embedding of a user problem is compared against these
examples to determine the most semantically relevant categories.
"""

CATEGORY_PROTOTYPES = {

    "EDUCATION": [
        "problems with schools and educational institutions",
        "lack of teachers or teaching staff",
        "students unable to access education",
        "poor school infrastructure",
        "damaged classrooms or school buildings",
        "lack of educational resources and learning materials",
        "problems affecting students and teachers",
        "vocational training and skill development problems",
        "lack of schools or educational facilities",
    ],

    "HEALTHCARE": [
        "problems with hospitals and healthcare facilities",
        "shortage of doctors and medical staff",
        "shortage of medicines in hospitals",
        "patients unable to access medical treatment",
        "lack of emergency healthcare services",
        "poor medical infrastructure",
        "healthcare services unavailable to rural residents",
        "disease prevention and treatment problems",
        "medical equipment shortages",
    ],

    "AGRICULTURE": [
        "problems faced by farmers and agriculture",
        "crop production problems",
        "lack of agricultural equipment",
        "crop disease and pest problems",
        "farmers facing irrigation problems",
        "problems with farming techniques",
        "agricultural productivity problems",
        "lack of agricultural information for farmers",
        "problems affecting crop cultivation",
    ],

    "WATER_MANAGEMENT": [
        "lack of clean drinking water",
        "broken handpump or public water pump",
        "water supply problems",
        "shortage of drinking water",
        "water pipeline and water distribution problems",
        "problems with wells and groundwater",
        "groundwater management problems",
        "irrigation water availability problems",
        "water supply infrastructure problems",
        "people unable to access safe water",
    ],

    "SANITATION": [
        "problems with toilets and sanitation facilities",
        "broken or unusable public toilets",
        "lack of toilets in schools",
        "sewage and wastewater problems",
        "garbage and solid waste management problems",
        "open defecation problems",
        "poor hygiene and sanitation",
        "blocked drainage and sewage systems",
        "improper waste disposal",
    ],

    "ENVIRONMENT": [
        "air pollution and poor air quality",
        "water pollution and environmental contamination",
        "environmental degradation",
        "problems caused by pollution",
        "climate change related problems",
        "flooding and environmental disasters",
        "natural disaster resilience problems",
        "deforestation and loss of natural resources",
        "environmental monitoring problems",
    ],

    "RURAL_LIVELIHOODS": [
        "problems affecting rural employment",
        "lack of employment opportunities in villages",
        "rural unemployment",
        "problems affecting rural livelihoods",
        "income generation problems for rural communities",
        "lack of livelihood opportunities for villagers",
        "economic opportunities in rural areas",
    ],

    "ACCESSIBILITY": [
        "problems faced by persons with disabilities",
        "lack of wheelchair accessibility",
        "lack of ramps for disabled people",
        "inaccessible public buildings",
        "accessibility problems for people with disabilities",
        "lack of assistive technology",
        "barriers faced by visually impaired people",
        "barriers faced by hearing impaired people",
        "accessible transportation problems",
        "sign language accessibility problems",
    ],

    "URBAN_INFRASTRUCTURE": [
        "problems with roads and streets in cities",
        "damaged urban roads",
        "street lighting problems",
        "traffic congestion in cities",
        "urban drainage problems",
        "problems with public infrastructure",
        "damaged bridges and public structures",
        "urban transport infrastructure problems",
        "problems with civic infrastructure",
    ],

    "PUBLIC_SERVICE_DELIVERY": [
        "problems accessing government services",
        "delays in government services",
        "problems with government offices",
        "difficulty obtaining government documents",
        "problems with public service delivery",
        "government application and registration problems",
        "delays in public welfare services",
        "citizens unable to access government schemes",
        "problems with government portals and services",
    ],
}