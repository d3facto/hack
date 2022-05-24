export const get_connected_user_id = () => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('user_id'))
        return params.get('user_id')
    return undefined
}

export const has_connected_user = () => {
    return get_connected_user_id() != undefined
}