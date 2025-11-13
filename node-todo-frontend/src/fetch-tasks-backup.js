     useEffect(() => {

        if (!accessToken) return
            const fetchData = async () => {
            try {
               const response = await fetch(`${domain}/tasks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
               })

               if (!response.ok) {
                throw new Error("Network response not ok")
               }

               const data = await response.json();

               const userTasks = Object.values(data).flat()
               const uncompletedTasks = userTasks.filter(task => task.completed === false && task.archived === false)
               const completedTasks = userTasks.filter(task => task.completed === true && task.archived === false)
               const archivedTasks = userTasks.filter(task => task.archived === true)

               setTasks(uncompletedTasks)
               setCompletedTasks(completedTasks)
               setArchivedTasks(archivedTasks)

            } catch (err) {
                console.log(err)
                setError(err.message)
            }
        }
        fetchData();
    }, [accessToken, refreshTrigger]) 