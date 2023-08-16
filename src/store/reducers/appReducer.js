import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    sec1: {},
    sec2: {},
    sec3: {},
    sec4: {},
    sec5: {},
    sec6: {},
    sec7: {},
    isLoading: false,
    newRelease: {},
    weekChart: [],
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            // console.log(action);
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                sec1: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
                sec2: action.homeData?.find(item => item.sectionId === 'hEditorTheme2') || {},
                sec3: action.homeData?.find(item => item.sectionId === 'hEditorTheme3') || {},
                sec4: action.homeData?.find(item => item.sectionId === 'hEditorTheme4') || {},
                sec5: action.homeData?.find(item => item.sectionId === 'hArtistTheme') || {},
                sec6: action.homeData?.find(item => item.sectionId === 'h100') || {},
                sec7: action.homeData?.find(item => item.sectionId === 'hAlbum') || {},
                newRelease: action.homeData?.find(item => item.sectionType === 'new-release') || {},
                weekChart: action.homeData?.find(item => item.sectionType === 'weekChart')?.items || [],
            }
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag,
            }

        default:
            return state
    }
}
export default appReducer