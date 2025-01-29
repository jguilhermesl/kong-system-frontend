const pendingTasks = [
  {
    value: "point-usage",
    label: "Uso de Pontos"
  }
]

export const getPendingTaskTypeLabel = (value: string) => {
  return pendingTasks.find((item) => item.value === value)?.label
}