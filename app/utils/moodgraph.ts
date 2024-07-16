export interface MoodData {
    date: string;
    note: string;
    emotions: string[];
    mood: string;
    userId: string;
    percent: string;
  }
  
  export interface ProcessedMoodData {
    date: string;
    averagePercent: number;
  }

  export const processData = (data: MoodData[]): ProcessedMoodData[] => {
    const groupedData = data.reduce(
      (acc: Record<string, MoodData[]>, entry: MoodData) => {
        const date = new Date(entry.date).toLocaleDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(entry);
        return acc;
      },
      {}
    );

    const chartData = Object.keys(groupedData).map((date) => {
      const dayData = groupedData[date];
      const averagePercent =
        dayData.reduce((sum, entry) => sum + Number(entry.percent), 0) /
        dayData.length;
      return { date, averagePercent };
    });

    return chartData;
  };