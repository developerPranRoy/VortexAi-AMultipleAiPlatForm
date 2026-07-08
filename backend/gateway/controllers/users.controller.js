

const getCurrentUser = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {

        res.status(500).json({ message: "user not found" })

    }
}

export default getCurrentUser